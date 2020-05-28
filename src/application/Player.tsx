import React, { useEffect, useRef, useReducer, useCallback, useMemo } from 'react'

import './Player.scss'
import { Button, Icon, Slider, Popover, Image, Text } from 'components/UI'
import { View, Cycle } from 'components/wrappers'
import duration from 'utils/duration'
import useRequest from 'hooks/useRequest'
import requestSongUrl from 'requests/song/url'
import { useTypedSelector, useTypedDispatch } from 'redux/createStore'
import useElement from 'hooks/useElement'
import { clamp } from 'utils/number'
import useFlag from 'hooks/useFlag'
import useRenderCounter from 'hooks/useRenderCounter'
import { switchState } from 'utils/string'

export type State = {
  playStatus: 'paused' | 'playing'
  playMode: 'random-mode' | 'infinit-mode' | 'recursive-mode'
  passedMilliseconds: number /* 播放了多少毫秒 */
  volumn: number // 0~1， 默认1，即全音量
}
export const initState: State = {
  playStatus: 'paused',
  playMode: 'random-mode',
  passedMilliseconds: 0,
  volumn: 1
} as State

export type Action =
  | { type: 'set playMode'; playMode: State['playMode'] }
  | { type: 'set playStatus'; playStatus: State['playStatus'] }
  | {
      type: 'set passed milliseconds'
      milliseconds: State['passedMilliseconds']
      needAffactAudioElement?: boolean
    }
  | { type: 'play audio' }
  | { type: 'pause audio' }
  | { type: 'toggle audio' }
  | { type: 'reset audio' }
  | { type: 'set audio volumn'; volumn: State['volumn'] }
  | { type: 'increase audio volumn by 5' }
  | { type: 'decrease audio volumn by 5' }

export default function PlayerBar() {
  /* --------------------------- 状态（redux+response） --------------------------- */

  useRenderCounter(PlayerBar.name)
  const reduxSongInfo = useTypedSelector(s => s.cache.songInfo)
  const reduxPlayer = useTypedSelector(s => s.player)
  const reduxDispatch = useTypedDispatch()
  const response = useRequest(requestSongUrl, {
    params: { id: reduxSongInfo.id },
    deps: [reduxSongInfo.id],
    callback: data => reduxDispatch({ type: 'SET_RESPONSE_SONG_URL', data })
  })
  const url = useMemo(() => String(response.data?.[0].url), [response])

  /* ---------------------------------- 元素相关 ---------------------------------- */

  const currentSecondSpanRef = useRef<HTMLSpanElement>()
  const audioElement = useElement('audio', el => {
    el.volume = reduxPlayer.volumn
    el.addEventListener('ended', () => dispatch({ type: 'reset audio' }))
  })
  const needAffactAudioElementFlag = useFlag()

  /* --------------------------------- 状态（本组件） -------------------------------- */

  const [localState, dispatch] = useReducer((state: State, action: Action) => {
    switch (action.type) {
      case 'reset audio': {
        needAffactAudioElementFlag.trigger()
        const newState = { ...state, playStatus: 'paused', passedMilliseconds: 0 } as State
        reduxDispatch({ type: 'UPDATE_PLAYER_DATA', state: newState })
        return newState
      }
      case 'play audio': {
        const newState = { ...state, playStatus: 'playing' } as State
        reduxDispatch({ type: 'UPDATE_PLAYER_DATA', state: newState })
        return newState
      }
      case 'pause audio': {
        const newState = { ...state, playStatus: 'paused' } as State
        reduxDispatch({ type: 'UPDATE_PLAYER_DATA', state: newState })
        return newState
      }
      case 'toggle audio': {
        const newState = {
          ...state,
          playStatus: switchState(state.playStatus, ['playing', 'paused'])
        } as State
        reduxDispatch({ type: 'UPDATE_PLAYER_DATA', state: newState })
        return newState
      }
      case 'set playStatus': {
        const newState = { ...state, playStatus: action.playStatus } as State
        reduxDispatch({ type: 'UPDATE_PLAYER_DATA', state: newState })
        return newState
      }
      case 'set playMode': {
        const newState = { ...state, playMode: action.playMode } as State
        reduxDispatch({ type: 'UPDATE_PLAYER_DATA', state: newState })
        return newState
      }
      case 'set passed milliseconds': {
        if (action.needAffactAudioElement) needAffactAudioElementFlag.trigger()
        const newState = { ...state, passedMilliseconds: action.milliseconds } as State
        reduxDispatch({ type: 'UPDATE_PLAYER_DATA', state: newState })
        return newState
      }
      case 'set audio volumn': {
        const newState = { ...state, volumn: clamp(action.volumn) } as State
        reduxDispatch({ type: 'UPDATE_PLAYER_DATA', state: newState })
        return newState
      }
      case 'increase audio volumn by 5': {
        const newState = { ...state, volumn: clamp(state.volumn + 0.05) } as State
        reduxDispatch({ type: 'UPDATE_PLAYER_DATA', state: newState })
        return newState
      }
      case 'decrease audio volumn by 5': {
        const newState = { ...state, volumn: clamp(state.volumn - 0.05) } as State
        reduxDispatch({ type: 'UPDATE_PLAYER_DATA', state: newState })
        return newState
      }
      default: {
        return state // 返回相同的引用，没有重渲染
      }
    }
  }, initState)

  /* ------------------------------ 副作用操作（UI回调等） ------------------------------ */

  // 载入新音乐时，就暂停播放，并且指针回到初始位置。
  useEffect(() => {
    dispatch({ type: 'reset audio' })
  }, [reduxSongInfo])

  useEffect(() => {
    audioElement.src = url
  }, [url])

  useEffect(() => {
    audioElement.volume = localState.volumn
  }, [localState.volumn])

  useEffect(() => {
    if (localState.playStatus === 'playing') {
      audioElement.play()
    }
  })

  useEffect(() => {
    if (localState.playStatus === 'paused') {
      audioElement.pause()
    }
  })

  useEffect(() => {
    if (needAffactAudioElementFlag.current) {
      audioElement.currentTime = localState.passedMilliseconds / 1000
    }
  }, [localState.passedMilliseconds])

  /* --------------------------------- callback： 时间指示器 -------------------------------- */

  const changingSecondText = useCallback((incomeCurrentMillisecond: number) => {
    if (currentSecondSpanRef.current) {
      currentSecondSpanRef.current.textContent = duration(incomeCurrentMillisecond).format('mm:ss')
    }
  }, [])

  /* -------------------------------- 进度条数值每秒递增 ------------------------------- */

  useEffect(() => {
    if (localState.playStatus === 'playing') {
      const timeoutId = window.setTimeout(() => {
        if (localState.playStatus === 'playing') {
          dispatch({
            type: 'set passed milliseconds',
            milliseconds: Math.min(localState.passedMilliseconds + 1000, Number(reduxSongInfo.dt))
          })
        }
      }, 1000)
      return () => clearTimeout(timeoutId)
    }
  })

  /* -------------------------------------------------------------------------- */
  return (
    <View as='section' className='player-bar'>
      <Image className='album-face' src={reduxSongInfo?.al?.picUrl} />
      <View className='music-buttons'>
        <Button className='last-song'>
          <Icon iconfontName='music_pre' />
        </Button>
        <Button
          className={localState.playStatus}
          onClick={() => dispatch({ type: 'toggle audio' })}
        >
          {localState.playStatus === 'playing' ? (
            <Icon iconfontName='pause' />
          ) : (
            <Icon iconfontName='play' />
          )}
        </Button>
        <Button className='next-song'>
          <Icon iconfontName='music_next' />
        </Button>
      </View>
      <View className='timeSlider'>
        <View className='songTitle'>{reduxSongInfo.name}</View>
        <View className='timestamp'>
          <Text ref={currentSecondSpanRef}>
            {duration(localState.passedMilliseconds).format('mm:ss')}
          </Text>
          <Text className='divider'> / </Text>
          <Text>{duration(reduxSongInfo.dt).format('mm:ss')}</Text>
        </View>
        <Slider
          value={localState.passedMilliseconds / (reduxSongInfo.dt ?? 0)}
          onMoveTrigger={percent => changingSecondText(percent * (reduxSongInfo.dt ?? 0))}
          onMoveTriggerDone={percent => {
            dispatch({
              type: 'set passed milliseconds',
              milliseconds: (reduxSongInfo.dt ?? NaN) * percent,
              needAffactAudioElement: true
            })
          }}
        />
      </View>
      <View className='info-panel'>
        <Button className='favorite'>
          <Icon iconfontName='heart_empty' />
        </Button>
        <Cycle
          className='indicator-like'
          initActiveName='random-mode'
          itemList={[
            {
              node: <Icon iconfontName='random-mode' />,
              activeName: 'random-mode',
              onActive: () => dispatch({ type: 'set playMode', playMode: 'random-mode' })
            },
            {
              node: <Icon iconfontName='infinit-mode' />,
              activeName: 'infinit-mode',
              onActive: () => dispatch({ type: 'set playMode', playMode: 'infinit-mode' })
            },
            {
              node: <Icon iconfontName='recursive-mode' />,
              activeName: 'recursive-mode',
              onActive: () => dispatch({ type: 'set playMode', playMode: 'recursive-mode' })
            }
          ]}
        />
        <Popover
          renderPopContent={
            <Slider
              defaultValue={localState.volumn}
              onMoveTriggerDone={volumn => {
                dispatch({ type: 'set audio volumn', volumn: volumn })
              }}
            />
          }
        >
          <Button className='volume'>
            <Icon iconfontName='volumn_empty' />
          </Button>
        </Popover>
        <Button className='playlist' onClick={() => console.log(`I'm clicked d`)}>
          <Icon iconfontName='music-list' />
        </Button>
      </View>
    </View>
  )
}
