import React, { useEffect, useRef, useCallback, useReducer, useContext } from 'react'

import { Action, State } from './Player'
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

function PlayerEffect(props: { state: State; dispatch: React.Dispatch<Action> }) {
  /* ---------------------------------- 元素相关 ---------------------------------- */
  const audioElement = useElement('audio')
  const [likelist, likelistDispatch] = useContext(LikelistContext)
  const [songInfo] = useContext(SongInfoContext)

  // /* ---------------------------------- 元素相关 ---------------------------------- */

  useEffect(() => {
    audioElement.volume = props.state.volumn
    audioElement.addEventListener('ended', () => props.dispatch({ type: 'reset audio' }))
  }, [])

  // /* ------------------------------ 副作用操作（UI回调等） ------------------------------ */
  // 请求一首歌的URL
  useEffect(() => {
    requestSongUrl({ id: songInfo.id })?.then(({ data: { data } }) => {
      props.dispatch({ type: 'set a song url', songId: songInfo.id || '', data })
    })
  }, [songInfo])

  // 切换音乐时 判断该音乐是否是我喜欢的音乐
  useEffect(() => {
    props.dispatch({
      type: 'like/dislike the song',
      isLike: likelist.includes(songInfo.id ?? NaN)
    })
  }, [songInfo])

  // 载入新音乐时，就暂停播放，并且指针回到初始位置。
  useEffect(() => {
    props.dispatch({ type: 'reset audio' })
  }, [songInfo])

  // 喜欢、取消喜欢音乐
  useEffect(() => {
    requestLike({
      params: { id: props.state.songId, like: props.state.isLike },
      from: PlayerEffect.name,
      force: true
    })?.then(() => {
      requestLikelist({
        params: { uid: storage.account().id /* FIXME - 应该是类似likelistDispatch 的上抛 */ },
        from: PlayerEffect.name,
        force: true
      })?.then(({ data: { ids } }) => {
        likelistDispatch?.({ type: 'set', newLikelist: ids })
      })
    })
  }, [props.state.isLike]) //TODO - 两个依赖都改变时才触发

  // 载入音乐的URL
  useEffect(() => {
    audioElement.src = props.state.responseSongUrl?.[0].url ?? ''
  }, [props.state.responseSongUrl])

  // 设定音乐音量
  useEffect(() => {
    audioElement.volume = props.state.volumn
  }, [props.state.volumn])

  // 播放/暂停
  useEffect(() => {
    if (props.state.playStatus === 'playing') {
      audioElement.play()
    }
    if (props.state.playStatus === 'paused') {
      audioElement.pause()
    }
  }, [props.state.playStatus])

  // 设定播放进度条
  useEffect(() => {
    audioElement.currentTime = props.state.passedMilliseconds / 1000
  }, [props.state.affectAudioElementCounter])

  // /* --------------------------------- callback： 时间指示器 -------------------------------- */

  // const changingSecondText = useCallback((incomeCurrentMillisecond: number) => {
  //   if (currentSecondSpanRef.current) {
  //     currentSecondSpanRef.current.textContent = duration(incomeCurrentMillisecond).format('mm:ss')
  //   }
  // }, [])

  // /* -------------------------------- 进度条数值每秒递增 ------------------------------- */

  // useEffect(() => {
  //   if (localState.playStatus === 'playing') {
  //     const timeoutId = window.setTimeout(() => {
  //       if (localState.playStatus === 'playing') {
  //         props.localDispatch({
  //           type: 'set passed milliseconds',
  //           milliseconds: Math.min(localState.passedMilliseconds + 1000, Number(songInfo.dt))
  //         })
  //       }
  //     }, 1000)
  //     return () => clearTimeout(timeoutId)
  //   }
  // })

  /* -------------------------------------------------------------------------- */
  return null
}

export default React.memo(PlayerEffect)
