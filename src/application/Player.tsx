import React, { useEffect, useRef, useCallback, useReducer, useContext } from 'react'

import './Player.scss'
import Effect from './PlayerEffects'

import requestLike from 'requests/like'
import requestSongUrl, { ResponseSongUrl } from 'requests/song/url'
import requestLikelist from 'requests/likelist'
import useElement from 'hooks/useElement'
import useDevRenderCounter from 'hooks/useDevRenderCounter'
import switchValue from 'utils/switchValue'
import { clamp } from 'utils/number'
import duration from 'utils/duration'
import { LikelistContext, LikelistAction } from 'appContext/likelist'
import { SongInfoContext } from 'appContext/SongInfo'
import { storage } from 'webAPI/localStorage'
import Text from 'baseUI/UI/Text'
import Image from 'baseUI/UI/Image'
import Togger from 'baseUI/UI/Togger'
import View from 'baseUI/UI/View'
import Button from 'baseUI/UI/Button'
import Icon from 'baseUI/UI/Icon'
import Slider from 'baseUI/UI/Slider'
import Cycle from 'baseUI/UI/Cycle'
import Popover from 'baseUI/UI/Popover'

// export 给 PlayerEffect
export type State = {
  isInit: boolean // 标识是否是出次渲染
  playStatus: 'paused' | 'playing' | 'loading' // 播放、暂停、载入中
  playMode: 'random-mode' | 'infinit-mode' | 'recursive-mode' // 随机模式、列表模式、单曲循环
  passedMilliseconds: number /* 播放了多少毫秒 */
  volumn: number // 0~1， 默认1，即全音量
  isLike: boolean // 在 “我喜欢” 的列表中
  affectAudioElementCounter: number // 是否会影响到Audio元素（递增值时能触发effect）
  responseSongUrl?: ResponseSongUrl // 储存response
  songId?: ID
}

// export 给 PlayerEffect
export type Action =
  | { type: 'done init' }
  | { type: 'set playMode'; playMode: State['playMode'] }
  | { type: 'set playStatus'; playStatus: State['playStatus'] }
  | {
      type: 'set passed milliseconds'
      milliseconds: State['passedMilliseconds']
      needAffactAudioElement?: boolean
    }
  | { type: 'play audio' }
  | { type: 'pause audio' }
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
  isInit: true,
  playStatus: 'paused',
  playMode: 'random-mode',
  passedMilliseconds: 0,
  volumn: 1,
  isLike: false,
  affectAudioElementCounter: 1
}
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'done init': {
      return { ...state, isInit: false }
    }
    case 'set a song url': {
      return { ...state, songId: action.songId, responseSongUrl: action.data }
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
        affectAudioElementCounter:
          state.affectAudioElementCounter + Number(action.needAffactAudioElement ?? false)
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
  useDevRenderCounter(PlayerBar.name)

  /* ----------------------------------- 状态 ----------------------------------- */
  const [songInfo] = useContext(SongInfoContext)
  const [state, dispatch] = useReducer(reducer, initState)

  /* --------------------------------- callback： 时间指示器 -------------------------------- */
  const currentSecondSpanRef = useRef<HTMLSpanElement>()
  const changingSecondText = useCallback((incomeCurrentMillisecond: number) => {
    if (currentSecondSpanRef.current) {
      currentSecondSpanRef.current.textContent = duration(incomeCurrentMillisecond).format('mm:ss')
    }
  }, [])

  /* -------------------------------- 进度条数值每秒递增 ------------------------------- */

  useEffect(() => {
    if (state.playStatus === 'playing') {
      const timeoutId = window.setTimeout(() => {
        if (state.playStatus === 'playing') {
          dispatch({
            type: 'set passed milliseconds',
            milliseconds: Math.min(state.passedMilliseconds + 1000, Number(songInfo.dt))
          })
        }
      }, 1000)
      return () => clearTimeout(timeoutId)
    }
  })

  // 内部元素的初始化都完成了
  useEffect(() => {
    dispatch({ type: 'done init' })
  }, [])

  /* -------------------------------------------------------------------------- */
  return (
    <>
      <Effect dispatch={dispatch} state={state} />
      <View as='section' className='player-bar'>
        <Image className='album-face' src={songInfo?.al?.picUrl} />
        <View className='music-buttons'>
          <Button className='last-song'>
            <Icon iconfontName='music_pre' />
          </Button>
          <Button
            className={state.playStatus}
            onClick={() => {
              switch (state.playStatus) {
                case 'playing':
                  return dispatch({ type: 'pause audio' })
                case 'paused':
                  return dispatch({ type: 'play audio' })
              }
            }}
          >
            {state.playStatus === 'playing' ? (
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
          <View className='songTitle'>{songInfo.name}</View>
          <View className='timestamp'>
            <Text ref={currentSecondSpanRef}>
              {duration(state.passedMilliseconds).format('mm:ss')}
            </Text>
            <Text className='divider'> / </Text>
            <Text>{duration(songInfo.dt).format('mm:ss')}</Text>
          </View>
          <Slider
            value={state.passedMilliseconds / (songInfo.dt ?? 0)}
            onMoveTrigger={percent => changingSecondText(percent * (songInfo.dt ?? 0))}
            onMoveTriggerDone={percent => {
              dispatch({
                type: 'set passed milliseconds',
                milliseconds: (songInfo.dt ?? NaN) * percent,
                needAffactAudioElement: true
              })
            }}
          />
        </View>
        <View className='info-panel'>
          <Togger
            className='favourite'
            active={state.isLike}
            trusyNode={<Icon iconfontName='heart' />}
            falsyNode={<Icon iconfontName='heart_empty' />}
            onToggle={() => dispatch({ type: 'toggle like the song' })}
          />
          <Cycle
            className='indicator-like'
            nodeList={[
              <Icon iconfontName='random-mode' />,
              <Icon iconfontName='infinit-mode' />,
              <Icon iconfontName='recursive-mode' />
            ]}
            onChange={index => {
              dispatch({
                type: 'set playMode',
                playMode:
                  // TODO 选择值的逻辑可以提取出来
                  index === 0 ? 'random-mode' : index === 1 ? 'infinit-mode' : 'recursive-mode'
              })
            }}
          />
          <Popover
            renderPopContent={
              <Slider
                defaultValue={state.volumn}
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
    </>
  )
}
