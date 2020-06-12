import React, { useEffect, useContext } from 'react'

import { Action, State } from './Player'
import requestLike from 'requests/like'
import requestSongUrl from 'requests/song/url'
import requestLikelist from 'requests/likelist'
import useDomNode from 'hooks/useDomNode'
import { LikelistContext } from 'appContext/likelist'
import { SongInfoContext } from 'appContext/SongInfo'
import { storage } from 'webAPI/localStorage'
import useAndEffect from 'hooks/useAndEffect'

function PlayerEffect(props: { state: State; dispatch: React.Dispatch<Action> }) {
  const audioElement = useDomNode('audio')
  const [likelist, likelistDispatch] = useContext(LikelistContext)
  const [songInfo] = useContext(SongInfoContext)

  useEffect(() => {
    audioElement.volume = props.state.volumn
    audioElement.addEventListener('ended', () => props.dispatch({ type: 'init', same: true }))
    audioElement.addEventListener('canplay', () => props.dispatch({ type: 'ready to play' }))
  }, [])

  // /* ------------------------------ 副作用操作（UI回调等） ------------------------------ */

  useEffect(() => {
    requestSongUrl({ id: songInfo.id })?.then(({ data: { data } }) => {
      props.dispatch({ type: 'set a song url', songId: songInfo.id || '', data })
    })
    props.dispatch({ type: 'init', isLike: likelist.includes(songInfo.id ?? NaN) })
  }, [songInfo])

  // 喜欢、取消喜欢音乐
  useAndEffect(() => {
    // TODO - 这里应该模仿dispatch的语法，使API的语法更一致
    requestLike({
      params: { id: props.state.songId, like: props.state.isLike },
      from: PlayerEffect.name,
      ignoreCache: true
    })?.then(() => {
      requestLikelist({
        params: { uid: storage.account().id /* FIXME - 应该是类似likelistDispatch 的上抛 */ },
        from: PlayerEffect.name,
        ignoreCache: true
      })?.then(({ data: { ids } }) => {
        likelistDispatch?.({ type: 'set', newLikelist: ids })
      })
    })
  }, [props.state.userActionCounter, props.state.isLike])

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

  /* -------------------------------- 进度条数值每秒递增 ------------------------------- */

  useEffect(() => {
    if (props.state.playStatus === 'playing') {
      const timeoutId = window.setTimeout(() => {
        if (props.state.playStatus === 'playing') {
          props.dispatch({
            type: 'set passed milliseconds',
            milliseconds: Math.min(props.state.passedMilliseconds + 1000, Number(songInfo.dt))
          })
        }
      }, 1000)
      return () => clearTimeout(timeoutId)
    }
  })

  return null
}

export default React.memo(PlayerEffect)
