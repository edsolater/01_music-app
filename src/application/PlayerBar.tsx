import React, { useEffect, useRef, useMemo, useCallback } from 'react'

import './PlayerBar.scss'
import { useElement, useMethods } from 'components/customHooks'
import { Button, Icon, Slider, Popover, Image, Text } from 'components/UI'
import { View, Cycle } from 'components/wrappers'
import duration from 'utils/duration'
import useResponse from 'hooks/useResponse'
import requestSongUrl from 'requests/song/url'
import { useTypedSelector, useTypedDispatch } from 'redux/createStore'

type PlayStatus = 'paused' | 'playing'
type PlayMode = 'random-mode' | 'infinit-mode' | 'recursive-mode'
type ComponentData = {
  currentSecond: number
  playMode: PlayMode
  playStatus: PlayStatus
}

export default function PlayerBar() {
  const songInfo = useTypedSelector(s => s.cache.songInfo)
  const reduxPlayer = useTypedSelector(s => s.player)
  const dispatch = useTypedDispatch()
  //TODO - useResponse 作为异步操作，需要支持回调函数的option
  const response = useResponse(
    requestSongUrl,
    { id: songInfo.id },
    // TODO - 如果有callback传参，指里的debug能容易很多
    [songInfo.id],
  )
  const audioElement = useElement('audio', el => {
    el.volume = reduxPlayer.volumn
  })

  const url = String(response.data?.[0].url)

  // 要做拖动滑块，快速改变数值，需要绕过react，所以不得不通过ref直接改变节点了
  const currentSecondSpanRef = useRef<HTMLSpanElement>()
  // FIXME  -  要全部干掉（把逻辑放到redux种）（不对，redux是存储结果的仓库，结果间互相干涉的逻辑也在redux，但产主结果的逻辑就放在组件本身，不要给redux的好）
  const [data, dataSetters] = useMethods(
    draft => ({
      playStatus(setter: ((oldStatus: PlayStatus) => PlayStatus) | PlayStatus) {
        const newStatus = typeof setter === 'function' ? setter(draft.playStatus) : setter
        switch (newStatus) {
          case 'playing':
            audioElement.play()
            break
          case 'paused':
            audioElement.pause()
            break
        }
        draft.playStatus = newStatus
      },
      playMode(setter: ((oldStatus: PlayMode) => PlayMode) | PlayMode) {
        const newMode = typeof setter === 'function' ? setter(draft.playMode) : setter
        switch (newMode) {
          case 'random-mode':
            audioElement.loop = false
            break
          case 'infinit-mode':
            audioElement.loop = true
            break
          case 'recursive-mode':
            audioElement.loop = false
            break
        }
        draft.playMode = newMode
      },
    }),
    {
      currentSecond: 0,
      playStatus: 'paused',
      playMode: 'random-mode',
    } as ComponentData,
  )

  /* ---------------------------- webAPI 音乐播放器改变音量 ---------------------------- */

  // TODO 等useResponse支持回调了才行
  const setSrcOfAudioElement = useCallback((src: string) => {
    audioElement.src = src
  }, [])

  useEffect(() => {
    audioElement.src = url
  }, [url])

  /* -------------------------------- 进度条数值每秒递增 ------------------------------- */

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (data.playStatus === 'playing') {
        dispatch({
          type: 'SET_PLAYER_PASSED_MILLISECONDS',
          passedMilliseconds: n => Math.min(n + 1000, Number(songInfo.dt)),
        })
      }
    }, 1000)
    return () => clearTimeout(timeoutId)
  })

  /* ----------------------------------- 回调 ----------------------------------- */

  // FIXME  -  要全部干掉
  const callbacks = useMemo(
    () => ({
      // 改变当前时间线显示的数字
      changingSecondText(incomeCurrentSecond: number) {
        if (currentSecondSpanRef.current) {
          currentSecondSpanRef.current.textContent = duration(incomeCurrentSecond * 1000).format(
            'mm:ss',
          )
        }
      },
      // 改变播放进度
      togglePlayPause() {
        dataSetters.playStatus(old => (old === 'paused' ? 'playing' : 'paused'))
      },
    }),
    [],
  )
  /* -------------------------------------------------------------------------- */
  return (
    <View as='section' className='player-bar'>
      <Image className='album-face' src={songInfo?.al?.picUrl} />
      <View className='music-buttons'>
        <Button className='last-song'>
          <Icon iconfontName='music_pre' />
        </Button>
        <Button className={data.playStatus} onClick={callbacks.togglePlayPause}>
          {data.playStatus === 'playing' ? (
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
            {duration(reduxPlayer.passedMilliseconds).format('mm:ss')}
          </Text>
          <Text className='divider'> / </Text>
          <Text>
            {duration(songInfo.dt).format('mm:ss')}
            {/* 像这种就是没有改变逻辑，只是改变显示的数据处理，直接写在ReactNode里反而好 */}
          </Text>
        </View>
        <Slider
          value={reduxPlayer.passedMilliseconds / 1000}
          max={Number(songInfo.dt) / 1000}
          onMoveTrigger={callbacks.changingSecondText}
          //TODO 这里不应该是百分比更合理吗
          onMoveTriggerDone={seconds => {
            dispatch({
              type: 'SET_PLAYER_PASSED_MILLISECONDS',
              passedMilliseconds: seconds * 1000,
            })
            audioElement.currentTime = seconds
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
              onActive: () => dataSetters.playMode('random-mode'),
            },
            {
              node: <Icon iconfontName='infinit-mode' />,
              activeName: 'infinit-mode',
              onActive: () => dataSetters.playMode('infinit-mode'),
            },
            {
              node: <Icon iconfontName='recursive-mode' />,
              activeName: 'recursive-mode',
              onActive: () => dataSetters.playMode('recursive-mode'),
            },
          ]}
        />
        <Popover
          renderPopContent={
            <Slider
              defaultValue={reduxPlayer.volumn}
              onMoveTriggerDone={volumn => {
                dispatch({ type: 'SET_PLAYER_VOLUMN', volumn: volumn })
                audioElement.volume = volumn
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
