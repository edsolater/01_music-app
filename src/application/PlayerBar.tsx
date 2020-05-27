import React, { useEffect, useRef, useReducer, useCallback, useMemo } from 'react'

import './PlayerBar.scss'
import { Button, Icon, Slider, Popover, Image, Text } from 'components/UI'
import { View, Cycle } from 'components/wrappers'
import duration from 'utils/duration'
import useRequest from 'hooks/useRequest'
import requestSongUrl from 'requests/song/url'
import { useTypedSelector, useTypedDispatch, CombinedAction } from 'redux/createStore'
import useElement from 'hooks/useElement'
import { clamp } from 'utils/number'
import useFlag from 'hooks/useFlag'
import useRenderCounter from 'hooks/useRenderCounter'

type LocalState = {
  playStatus: 'paused' | 'playing'
  playMode: 'random-mode' | 'infinit-mode' | 'recursive-mode'
  passedMilliseconds: number /* 播放了多少毫秒 */
  volumn: number // 0~1， 默认1，即全音量
}
type LocalAction =
  | { type: 'set playMode'; playMode: LocalState['playMode'] }
  | { type: 'set playStatus'; playStatus: LocalState['playStatus'] }
  | {
      type: 'set passed milliseconds'
      milliseconds: LocalState['passedMilliseconds']
      needAffactAudioElement?: boolean
    }
  | { type: 'play audio' }
  | { type: 'pause audio' }
  | { type: 'toggle audio' }
  | { type: 'reset audio' }
  | { type: 'set audio volumn'; volumn: LocalState['volumn'] }
  | { type: 'increase audio volumn by 5' }
  | { type: 'decrease audio volumn by 5' }

//TODO 异想天开，将各个功能性大组件的dispatch，保存起来，各localState用useRef保存起来，从而丢弃掉redux。

export default function PlayerBar() {
  useRenderCounter(PlayerBar.name)
  const reduxSongInfo = useTypedSelector(s => s.cache.songInfo)
  const reduxPlayer = useTypedSelector(s => s.player)
  const reduxDispatch = useTypedDispatch()
  // TODO 异想天开 response 专门在App成立一个超级useReducer，并deps，以满足某些情况时自动进行请求行为。而不是手动维护在组件里
  const response = useRequest(requestSongUrl, {
    params: { id: reduxSongInfo.id },
    deps: [reduxSongInfo.id]
  })
  const url = useMemo(() => String(response.data?.[0].url), [response])

  const currentSecondSpanRef = useRef<HTMLSpanElement>()
  const audioElement = useElement('audio', el => {
    el.volume = reduxPlayer.volumn
    el.addEventListener('ended', () => dispatch({ type: 'reset audio' }))
  })
  const needAffactAudioElementFlag = useFlag()

  const [localState, dispatch] = useReducer(
    (state: LocalState, action: LocalAction | CombinedAction) => {
      switch (action.type) {
        case 'reset audio':
          needAffactAudioElementFlag.trigger()
          return { ...state, playStatus: 'paused', passedMilliseconds: 0 } as LocalState
        case 'play audio':
          return { ...state, playStatus: 'playing' } as LocalState
        case 'pause audio':
          return { ...state, playStatus: 'paused' } as LocalState
        case 'toggle audio':
          return {
            ...state,
            playStatus: state.playStatus === 'paused' ? 'playing' : 'paused'
          } as LocalState
        case 'set playStatus':
          return { ...state, playStatus: action.playStatus } as LocalState
        case 'set playMode':
          return { ...state, playMode: action.playMode } as LocalState
        case 'set passed milliseconds':
          if (action.needAffactAudioElement) needAffactAudioElementFlag.trigger()
          return { ...state, passedMilliseconds: action.milliseconds } as LocalState
        case 'set audio volumn':
          return { ...state, volumn: clamp(action.volumn) } as LocalState
        case 'increase audio volumn by 5':
          return { ...state, volumn: clamp(state.volumn + 0.05) } as LocalState
        case 'decrease audio volumn by 5':
          return { ...state, volumn: clamp(state.volumn - 0.05) } as LocalState
        default:
          reduxDispatch(action)
          return state // 返回相同的引用，没有重渲染
      }
    },
    {
      playStatus: 'paused',
      playMode: 'random-mode',
      passedMilliseconds: 0,
      volumn: 1
    } as LocalState
  )

  // 载入新音乐时，就暂停播放，并且指针回到初始位置。
  useEffect(() => {
    dispatch({ type: 'reset audio' })
  }, [reduxSongInfo])

  /* ---------------------------- effect： webAPI 音乐播放器相关 ---------------------------- */

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

  const changingSecondText = useCallback((incomeCurrentSecond: number) => {
    if (currentSecondSpanRef.current) {
      currentSecondSpanRef.current.textContent = duration(incomeCurrentSecond * 1000).format(
        'mm:ss'
      )
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
          <Text>
            {duration(reduxSongInfo.dt).format('mm:ss')}
            {/* 像这种就是没有改变逻辑，只是改变显示的数据处理，直接写在ReactNode里反而好 */}
          </Text>
        </View>
        <Slider
          value={localState.passedMilliseconds / 1000}
          max={Number(reduxSongInfo.dt) / 1000}
          onMoveTrigger={changingSecondText}
          //TODO 这里不应该是百分比更合理吗，中间商应该是个比值（比如物理中的速度就是个出色的中间商）
          onMoveTriggerDone={seconds => {
            dispatch({
              type: 'set passed milliseconds',
              milliseconds: seconds * 1000,
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
              defaultValue={reduxPlayer.volumn}
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
