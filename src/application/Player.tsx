import React, { useEffect, useRef, useCallback, useMemo, useReducer } from 'react'

import './Player.scss'
import { Button, Icon, Slider, Popover, Image, Text } from 'components/UI'
import { View, Cycle } from 'components/wrappers'
import duration from 'utils/duration'
import requestSongUrl, { ResponseSongUrl } from 'requests/song/url'
import { useTypedSelector, useTypedDispatch, useReduxState } from 'redux/createStore'
import useElement from 'hooks/useElement'
import useDevRenderCounter from 'hooks/useDevRenderCounter'
import requestLike from 'requests/like'
import switchValue from 'utils/switchValue'
import { clamp } from 'utils/number'

type State = {
  playStatus: 'paused' | 'playing' // 播放、暂停
  playMode: 'random-mode' | 'infinit-mode' | 'recursive-mode' // 随机模式、列表模式、单曲循环
  passedMilliseconds: number /* 播放了多少毫秒 */
  volumn: number // 0~1， 默认1，即全音量
  isLike: boolean // 在 “我喜欢” 的列表中
  affectAudioElementCounter: number // 是否会影响到Audio元素（递增值时能触发effect）
  responseSongUrl?: ResponseSongUrl // 储存response
}

type Action =
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
  | { type: 'toggle like the song' }
  | { type: 'like the song'; isInit?: boolean }
  | { type: 'dislike the song'; isInit?: boolean }
  | {
      type: 'set a song url'
      songId: ID
      data: ResponseSongUrl
    }

const initState: State = {
  playStatus: 'paused',
  playMode: 'random-mode',
  passedMilliseconds: 0,
  volumn: 1,
  isLike: false,
  affectAudioElementCounter: 1
}
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set a song url': {
      return { ...state, responseSongUrl: action.data }
    }
    case 'like the song': {
      return { ...state, isLike: true }
    }
    case 'dislike the song': {
      return { ...state, isLike: false }
    }
    case 'toggle like the song': {
      return { ...state, isLike: !state.isLike }
    }
    case 'reset audio': {
      return {
        ...state,
        playStatus: 'paused',
        passedMilliseconds: 0,
        affectAudioElementCounter: state.affectAudioElementCounter + 1
      }
    }
    case 'play audio': {
      return { ...state, playStatus: 'playing' }
    }
    case 'pause audio': {
      return { ...state, playStatus: 'paused' }
    }
    case 'toggle audio': {
      return {
        ...state,
        playStatus: switchValue(state.playStatus, ['playing', 'paused'])
      }
    }
    case 'set playStatus': {
      return { ...state, playStatus: action.playStatus }
    }
    case 'set playMode': {
      return { ...state, playMode: action.playMode }
    }
    case 'set passed milliseconds': {
      return {
        ...state,
        passedMilliseconds: action.milliseconds,
        affectAudioElementCounter: action.needAffactAudioElement
          ? state.affectAudioElementCounter + 1
          : state.affectAudioElementCounter
      }
    }
    case 'set audio volumn': {
      return { ...state, volumn: clamp(action.volumn) }
    }
    default: {
      throw new Error(`${PlayerBar.name} 的 localState 无法初始化`)
    }
  }
}

export default function PlayerBar() {
  /* ---------------------------------- dev ---------------------------------- */

  const renderTimeCounter = useDevRenderCounter()
  useEffect(() => {
    console.log(`${PlayerBar.name} 渲染了 ${renderTimeCounter.current} 次`)
  })

  /* --------------------------- 状态（redux+response） --------------------------- */
  const [localState, dispatch] = useReducer(reducer, initState)
  const reduxLikelist = useTypedSelector(s => s.cache.likelist) //FIXME 把这四个去掉，就用context
  const reduxSongInfo = useTypedSelector(s => s.cache.songInfo) //FIXME 把这四个去掉，就用context
  const redux = useReduxState() //FIXME 把这四个去掉，就用context
  const reduxDispatch = useTypedDispatch() //FIXME 把这四个去掉，就用context

  useEffect(() => {
    const reduxResponseSongUrl = redux.response.songUrl[reduxSongInfo.id || '']
    if (reduxResponseSongUrl) {
      dispatch({
        type: 'set a song url',
        songId: reduxSongInfo.id || '',
        data: reduxResponseSongUrl
      })
    } else {
      requestSongUrl({ id: reduxSongInfo.id }).then(({ data: { data } }) => {
        reduxDispatch({ type: '[RESPONSE]_CACH_A_SONG_URL', songId: reduxSongInfo.id || '', data })
        dispatch({ type: 'set a song url', songId: reduxSongInfo.id || '', data })
      })
    }
  }, [reduxSongInfo.id])
  const url = useMemo(() => localState.responseSongUrl?.[0].url, [localState.responseSongUrl])

  /* ---------------------------------- 元素相关 ---------------------------------- */

  const currentSecondSpanRef = useRef<HTMLSpanElement>()
  const audioElement = useElement('audio', el => {
    el.volume = localState.volumn
    el.addEventListener('ended', () => dispatch({ type: 'reset audio' }))
  })

  /* ------------------------------ 副作用操作（UI回调等） ------------------------------ */
  // 喜欢/取消喜欢音乐时发出请求
  useEffect(() => {
    if (localState.isLike) {
      requestLike({ id: reduxSongInfo.id, like: true })
    } else {
      requestLike({ id: reduxSongInfo.id, like: false })
    }
  }, [localState.isLike])

  // 切换音乐时 判断该音乐是否是我喜欢的音乐
  useEffect(() => {
    if (reduxLikelist.includes(reduxSongInfo.id ?? NaN)) {
      dispatch({ type: 'like the song', isInit: true })
    } else {
      dispatch({ type: 'dislike the song', isInit: true })
    }
  }, [reduxSongInfo])

  // 载入新音乐时，就暂停播放，并且指针回到初始位置。
  useEffect(() => {
    dispatch({ type: 'reset audio' })
  }, [reduxSongInfo])

  useEffect(() => {
    if (url) {
      audioElement.src = url
    }
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
    audioElement.currentTime = localState.passedMilliseconds / 1000
  }, [localState.affectAudioElementCounter])

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
        <Button
          className='favorite'
          onClick={() => {
            dispatch({ type: 'toggle like the song' })
          }}
        >
          <Icon iconfontName={localState.isLike ? 'heart' : 'heart_empty'} />
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
