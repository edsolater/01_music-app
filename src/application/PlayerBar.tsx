import React, { useEffect, useRef, useMemo } from 'react'

import './PlayerBar.scss'
import { useElement, useMethods } from 'components/customHooks'
import { Button, Icon, Slider, Popover, Image, Text } from 'components/UI'
import { View, Cycle } from 'components/wrappers'
import duration from 'utils/duration'
import useResponse from 'hooks/useResponse'
import requestSongUrl from 'requests/song/url'
import { useTypedSelector } from 'redux/createStore'

type PlayStatus = 'paused' | 'playing'
type PlayMode = 'random-mode' | 'infinit-mode' | 'recursive-mode'
type ComponentData = {
  currentSecond: number
  playMode: PlayMode
  playStatus: PlayStatus
}

export default function PlayerBar() {
  const songInfo = useTypedSelector(s => s.fromResponse.songInfo)
  const response = useResponse(
    requestSongUrl,
    {
      id: songInfo.id,
    },
    // TODO - 如果有callback传参，指里的debug能容易很多
    [songInfo.id],
  )
  const playerBar = {
    /**音量大小 */
    volumn: 1,
    /**播放模式 */
    mode: '列表循环' as '单曲循环' | '列表循环' | '随机选取',
    /**播放列表 */
    musicList: [],
  }

  const audioElement = useElement('audio', el => {
    el.volume = playerBar.volumn
  })

  const url = String(response.data?.[0].url)
  useEffect(() => {
    audioElement.src = url
  }, [url])

  const currentSecondSpanRef = useRef<HTMLSpanElement>()
  // TODO -  总觉得这段逻辑过于繁琐了，应该可以把逻辑封装成hooks，但估计现在的实力是做不到的
  const [data, dataSetters] = useMethods(
    draft => ({
      songSecond(
        setter: ((oldSeconds: number) => number) | number,
        options: { affectPlayerBar: boolean } = { affectPlayerBar: false },
      ) {
        const newSecond = typeof setter === 'function' ? setter(draft.currentSecond) : setter
        if (newSecond <= Number(songInfo.dt) / 1000) {
          if (options.affectPlayerBar) audioElement.currentTime = newSecond
          draft.currentSecond = newSecond
        }
      },
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

  /* -------------------------------- 进度条数值每秒递增 ------------------------------- */

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (data.playStatus === 'playing') {
        dataSetters.songSecond(n => n + 1)
      }
    }, 1000)
    return () => clearTimeout(timeoutId)
  })

  /* ----------------------------------- 回调 ----------------------------------- */

  // TODO -  最终要合并到useMethod， 现在看有重复
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
      setSongProcess(incomeCurrentSecond: number) {
        dataSetters.songSecond(() => incomeCurrentSecond, { affectPlayerBar: true })
      },
      setVolumn(currentPercentage: number) {
        audioElement.volume = currentPercentage
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
            {duration(data.currentSecond * 1000).format('mm:ss')}
          </Text>
          <Text className='divider'> / </Text>
          <Text>
            {duration(songInfo.dt).format('mm:ss')}
            {/* 像这种就是没有改变逻辑，只是改变显示的数据处理，直接写在ReactNode里反而好 */}
          </Text>
        </View>
        <Slider
          value={data.currentSecond}
          max={Number(songInfo.dt) / 1000}
          onMoveTrigger={callbacks.changingSecondText}
          onMoveTriggerDone={callbacks.setSongProcess}
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
            <Slider defaultValue={playerBar.volumn} onMoveTriggerDone={callbacks.setVolumn} />
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
