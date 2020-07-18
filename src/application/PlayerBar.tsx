import React, { useRef, useReducer, useContext, useEffect } from 'react'
import './style.scss'

import fetch from 'api/fetch'
import useDevRenderCounter from 'hooks/useDevRenderCounter'
import { clamp } from 'functions/number'
import duration from 'functions/duration'
import { SongInfoContext } from 'context/SongInfo'
import Text from 'baseUI/UI/Text'
import Togger from 'baseUI/UI/Togger'
import View from 'baseUI/UI/View'
import Button from 'baseUI/UI/Button'
import Icon from 'baseUI/UI/Icon'
import Slider from 'baseUI/UI/Slider'
import Cycle from 'baseUI/UI/Cycle'
import Popover from 'baseUI/UI/Popover'
import useDomNode from 'hooks/useDomNode'
import { LikelistContext } from 'context/likelist'
import useLogicAndEffect from 'hooks/useAndEffect'
import SongDetailPage from './SongDetailPage'
import { overwrite } from 'functions/object'

// 导出给它的子组件使用
export type State = {
  userActionCounter: number // 记录用户事件
  playMode: 'random-mode' | 'infinit-mode' | 'recursive-mode' // 随机模式、列表模式、单曲循环
  passedMilliseconds: number /* 播放了多少毫秒 */
  canPlay: boolean // 允许开始播放
  isplaying: boolean // 是否正在播放
  volumn: number // 0~1， 默认1，即全音量
  isLike: boolean // 在 “我喜欢” 的列表中
  affectAudioElementCounter: number // 是否会影响到Audio元素（递增值时能触发effect）
  responseSongUrl: SrcUrl // 储存response
  showSongDetailPage: boolean //是否显示SongDetaiPage
}
const initState: State = {
  // 重渲染会不会影响
  userActionCounter: 0,
  affectAudioElementCounter: 1,
  //播放器状态
  playMode: 'random-mode',
  passedMilliseconds: 0,
  volumn: 1,
  canPlay: false,
  isplaying: false,
  isLike: false,
  showSongDetailPage: false,
  // 跟返回值有关
  responseSongUrl: ''
}

export type Action =
  | {
      type: 'init'
      isLike?: boolean /* 指示新音乐是否属于我喜欢 */
      same?: boolean /* 指示是否是同一首歌 */
    }
  | { type: 'set playMode'; playMode: State['playMode'] }
  | { type: 'ready to play' }
  | {
      type: 'set passed milliseconds'
      milliseconds: State['passedMilliseconds']
      needAffactAudioElement?: boolean
    }
  | { type: 'play audio' }
  | { type: 'pause audio' }
  | { type: 'set audio volumn'; volumn: State['volumn'] }
  | { type: 'like/dislike the song'; isLike: boolean; byUI?: boolean }
  | { type: 'toggle <SongDetailPage>' }
  | ({
      type: 'set by data'
    } & Partial<State>)

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ready to play': {
      return { ...state, canPlay: true }
    }
    case 'like/dislike the song': {
      return {
        ...state,
        isLike: action.isLike,
        userActionCounter: state.userActionCounter + (action.byUI ? 1 : 0)
      }
    }
    case 'init': {
      return {
        ...state,
        canPlay: Boolean(action.same), // 除非指定，不然就还没准备好播放
        isLike: action.isLike ?? state.isLike, // 判断该音乐是否是我喜欢的音乐
        isplaying: false, // 暂停播放
        passedMilliseconds: 0, // 指针回到初始位置
        affectAudioElementCounter: state.affectAudioElementCounter + 1 // 影响到Audio控件
      }
    }
    case 'play audio': {
      if (state.canPlay) {
        return { ...state, isplaying: true }
      } else {
        return state
      }
    }
    case 'pause audio': {
      return { ...state, isplaying: false }
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
    case 'set by data': {
      return overwrite({ ...state }, action)
    }
    case 'toggle <SongDetailPage>': {
      return { ...state, showSongDetailPage: !state.showSongDetailPage }
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
  const audioElement = useDomNode('audio')
  const [likelist, likelistDispatch] = useContext(LikelistContext)

  // TODO - useEffect 的音乐相关指令代码，使用一个组件封装他，就叫 <MyAudio> 吧
  /**
   * 获取song的url，并判断该song是否是我喜欢的音乐
   */
  useEffect(() => {
    Promise.all([fetch('/song/url', { id: songInfo.id })]).then(reses => {
      dispatch({
        type: 'set by data',
        responseSongUrl: reses[0]?.data.data[0].url
      })
    })
    dispatch({
      type: 'set by data',
      // ? 初始化时因为要拉取数据，重复渲染多次其实是正常现像？
      isLike: likelist.includes(songInfo.id ?? NaN)
    })
  }, [songInfo.id])

  /**
   * 喜欢、取消喜欢音乐
   */
  useLogicAndEffect(() => {
    fetch('/like', { id: songInfo.id, like: state.isLike })?.then(() => {
      fetch('/likelist')?.then(({ data: { ids } }) => {
        likelistDispatch?.({ type: 'set by data', newLikelist: ids })
      })
    })
  }, [state.userActionCounter, state.isLike])

  /* --------------------------------- callback： 时间指示器 -------------------------------- */
  const currentSecondSpanRef = useRef<HTMLSpanElement>()
  const changingSecondText = (incomeCurrentMillisecond: number) => {
    if (currentSecondSpanRef.current) {
      currentSecondSpanRef.current.textContent = duration(incomeCurrentMillisecond).format('mm:ss')
    }
  }

  //#region ------------------- 音乐播放器相关指令代码 -------------------
  /**
   * 载入音乐的URL
   */
  useEffect(() => {
    audioElement.src = state.responseSongUrl
  }, [state.responseSongUrl])

  /**
   * 初始时设定音量，并设定是否能播放、是否播放结束的回调
   */
  useEffect(() => {
    audioElement.volume = state.volumn
    audioElement.addEventListener('canplay', () => dispatch({ type: 'ready to play' }))
    audioElement.addEventListener('ended', () => dispatch({ type: 'init', same: true }))
  }, [])

  /**
   * 播放/暂停乐曲
   */
  useEffect(() => {
    if (state.isplaying === true) {
      audioElement.play()
    }
    if (state.isplaying === false) {
      audioElement.pause()
    }
  }, [state.isplaying])

  /**
   * 设定音乐音量
   */
  useEffect(() => {
    audioElement.volume = state.volumn
  }, [state.volumn])

  /**
   * 设定音乐的播放进度
   */
  useEffect(() => {
    audioElement.currentTime = state.passedMilliseconds / 1000
  }, [state.affectAudioElementCounter])

  /**
   * 进度条数值每秒递增
   */
  useEffect(() => {
    if (state.isplaying === true) {
      const timeoutId = window.setTimeout(() => {
        if (state.isplaying === true) {
          dispatch({
            type: 'set passed milliseconds',
            milliseconds: Math.min(state.passedMilliseconds + 1000, Number(songInfo.dt))
          })
        }
      }, 1000)
      return () => clearTimeout(timeoutId)
    }
  })
  //#endregion

  return (
    <>
      <section className='PlayerBar'>
        <div
          className='album-face'
          onClick={() => {
            dispatch({ type: 'toggle <SongDetailPage>' })
          }}
        >
          <img src={songInfo.al?.picUrl} />
        </div>
        <View className='music-buttons'>
          <Button className='last-song'>
            <Icon iconfontName='music_pre' />
          </Button>
          <Button
            className={['play', state.canPlay && 'can-play']}
            onClick={() =>
              state.canPlay &&
              dispatch({ type: state.isplaying === true ? 'pause audio' : 'play audio' })
            }
          >
            {state.isplaying === true ? (
              <Icon iconfontName='pause' />
            ) : (
              <Icon iconfontName='play' />
            )}
          </Button>
          <Button className='next-song'>
            <Icon iconfontName='music_next' />
          </Button>
        </View>
        <View className='time-slider'>
          <View className='song-title'>{songInfo.name}</View>
          <View className='timestamp'>
            <Text ref={currentSecondSpanRef} line>
              {duration(state.passedMilliseconds).format('mm:ss')}
            </Text>
            <Text className='divider'> / </Text>
            <Text line>{duration(songInfo.dt).format('mm:ss')}</Text>
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
            onToggle={() =>
              dispatch({ type: 'like/dislike the song', isLike: !state.isLike, byUI: true })
            }
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
      </section>
      <SongDetailPage
        shown={state.showSongDetailPage}
        palyerState={state}
        playerDispatch={dispatch}
      />
    </>
  )
}
