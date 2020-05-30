import React, { useEffect, useRef, useCallback, useMemo, useContext } from 'react'

import './Player.scss'
import { Button, Icon, Slider, Popover, Image, Text } from 'components/UI'
import { View, Cycle } from 'components/wrappers'
import duration from 'utils/duration'
import requestSongUrl from 'requests/song/url'
import { useTypedSelector, useTypedDispatch } from 'redux/createStore'
import useElement from 'hooks/useElement'
import useDevRenderCounter from 'hooks/useDevRenderCounter'
import requestLike from 'requests/like'
import { PlayerContext } from './PlayerContext'

export default function PlayerBar() {
  /* ---------------------------------- dev ---------------------------------- */

  const renderTimeCounter = useDevRenderCounter()
  useEffect(() => {
    console.log(`${PlayerBar.name} 渲染了 ${renderTimeCounter.current} 次`)
  })

  /* --------------------------- 状态（redux+response） --------------------------- */
  const [localState, dispatch] = useContext(PlayerContext)
  const reduxLikelist = useTypedSelector(s => s.cache.likelist)
  const reduxSongInfo = useTypedSelector(s => s.cache.songInfo)
  const reduxResonseSongUrl = useTypedSelector(s => s.response.songUrl[reduxSongInfo.id || ''])
  const reduxDispatch = useTypedDispatch()
  useEffect(() => {
    if (!reduxResonseSongUrl) {
      requestSongUrl({ id: reduxSongInfo.id }).then(({ data: { data } }) => {
        reduxDispatch({ type: '[RESPONSE]_SET_A_SONG_URL', songId: reduxSongInfo.id || '', data })
      })
    }
  }, [reduxSongInfo.id])
  const url = useMemo(() => reduxResonseSongUrl?.[0].url, [reduxResonseSongUrl])

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
      requestLike({ id: reduxSongInfo.id, like: true }) // FIXME - 需要从网易云音乐的官方应用抓个包看看 //还需要克服接口的缓存机制
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
  }, [localState.affectAudioElement])

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
