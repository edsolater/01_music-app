import React, { useEffect, useContext } from 'react'

import { Action, State } from './Player'
import requestLike from 'requests/like'
import requestSongUrl from 'requests/song/url'
import requestLikelist from 'requests/likelist'
import useDomNode from 'hooks/useDomNode'
import { LikelistContext } from 'appContext/likelist'
import { SongInfoContext } from 'appContext/SongInfo'
import { storage } from 'webAPI/localStorage'
import useStatedEffect from 'hooks/useStatedEffect'

function PlayerEffect(props: { state: State; dispatch: React.Dispatch<Action> }) {
  console.log(999)
  /* ---------------------------------- 元素相关 ---------------------------------- */
  const audioElement = useDomNode('audio')
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
    console.log(8)
    requestSongUrl({ id: songInfo.id })?.then(({ data: { data } }) => {
      props.dispatch({ type: 'set a song url', songId: songInfo.id || '', data })
    })
  }, [songInfo])

  // 切换音乐时 判断该音乐是否是我喜欢的音乐
  useEffect(() => {
    console.log(9)
    props.dispatch({
      type: 'like/dislike the song',
      isLike: likelist.includes(songInfo.id ?? NaN)
    })
  }, [songInfo])

  // 载入新音乐时，就暂停播放，并且指针回到初始位置。
  useEffect(() => {
    console.log(0)
    props.dispatch({ type: 'reset audio' })
  }, [songInfo])

  // 喜欢、取消喜欢音乐
  useStatedEffect(
    prev => {
      if (props.state.userActionCounter === prev.userActionCounter) return
      console.log('props.state.userActionCounter: ', props.state.userActionCounter)
      console.log('prev.userActionCounter: ', prev.userActionCounter)
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
    },
    { userActionCounter: props.state.userActionCounter, isLike: props.state.isLike }
  ) //TODO - 两个依赖都改变时才触发

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
