import React, { useEffect, useRef } from 'react'

import { Time } from 'mypack/class'
import './AudioPlayer.scss'
import { useElement, useMethods } from 'mypack/components/customHooks'
import { Button, Icon, Slider, Popover, Image, Text } from 'mypack/components/lower'
import { useTypedStoreSelector } from 'store'
import { View, Cycle } from 'mypack/components/wrappers'

type PlayStatus = 'paused' | 'playing'
type PlayMode = 'random-mode' | 'infinit-mode' | 'recursive-mode'
type ComponentData = {
  currentSecond: number
  playMode: PlayMode
  playStatus: PlayStatus
}

export default function AudioPlayer() {
  const playerBar = useTypedStoreSelector((appStore) => appStore.playerBar)
  const audioElement = useElement('audio', (el) => {
    el.volume = playerBar.volumn
    el.src = String(playerBar.currentMusicInfo?.soundtrackUrl)
  })
  const currentSecondRef = useRef<HTMLSpanElement>()
  const [data, dataSetters] = useMethods(
    (componentData) => ({
      songSecond(
        setter: ((oldSeconds: number) => number) | number,
        options: { affectAudioPlayer: boolean } = { affectAudioPlayer: false },
      ) {
        const newSecond =
          typeof setter === 'function' ? setter(componentData.currentSecond) : setter
        if (newSecond <= playerBar.currentMusicInfo.totalSeconds) {
          if (options.affectAudioPlayer) audioElement.currentTime = newSecond
          componentData.currentSecond = newSecond
        }
      },
      playStatus(setter: ((oldStatus: PlayStatus) => PlayStatus) | PlayStatus) {
        const newStatus = typeof setter === 'function' ? setter(componentData.playStatus) : setter
        switch (newStatus) {
          case 'playing':
            audioElement.play()
            break
          case 'paused':
            audioElement.pause()
            break
        }
        componentData.playStatus = newStatus
      },
      playMode(setter: ((oldStatus: PlayMode) => PlayMode) | PlayMode) {
        const newMode = typeof setter === 'function' ? setter(componentData.playMode) : setter
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
        componentData.playMode = newMode
      },
    }),
    {
      currentSecond: 0,
      playStatus: 'paused',
      playMode: 'random-mode',
    } as ComponentData,
  )

  // 播放器进度条
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (data.playStatus === 'playing') {
        dataSetters.songSecond((n) => n + 1)
      }
    }, 1000)
    return () => clearTimeout(timeoutId)
  })
  return (
    <View as='section' className='player-bar'>
      <Image className='album-face' src={playerBar.currentMusicInfo?.albumUrl} />
      <View className='music-buttons'>
        <Button className='last-song' onClick={() => console.log(`I'm clicked 1`)}>
          <Icon iconfontName='music_pre' />
        </Button>
        <Button
          className={data.playStatus}
          onClick={() => {
            dataSetters.playStatus((old) => (old === 'paused' ? 'playing' : 'paused'))
          }}
        >
          {data.playStatus === 'playing' ? (
            <Icon iconfontName='pause' />
          ) : (
            <Icon iconfontName='play' />
          )}
        </Button>
        <Button className='next-song' onClick={() => console.log(`I'm clicked 3`)}>
          <Icon iconfontName='music_next' />
        </Button>
      </View>
      <View className='timeSlider'>
        <View className='songTitle'>{playerBar.currentMusicInfo?.songName}</View>
        <View className='timestamp'>
          <Text ref={currentSecondRef}>{Time(data.currentSecond).format('MM:ss')}</Text>
          <Text className='divider'> / </Text>
          <Text>{Time(Number(playerBar.currentMusicInfo?.totalSeconds)).format('MM:ss')}</Text>
        </View>
        <Slider
          value={data.currentSecond}
          max={Number(playerBar.currentMusicInfo?.totalSeconds)}
          onMoveTrigger={(incomeCurrentSecond) => {
            if (currentSecondRef.current) {
              currentSecondRef.current.textContent = Time(incomeCurrentSecond).format('MM:ss')
            }
          }}
          onMoveTriggerDone={(incomeCurrentSecond) => {
            dataSetters.songSecond(() => incomeCurrentSecond, { affectAudioPlayer: true })
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
              defaultValue={playerBar.volumn}
              onMoveTriggerDone={(currentPercentage: number) => {
                // TODO appData.setVolumn(currentPercentage) // 这需要建立整个应用的dispatcher
                audioElement.volume = currentPercentage
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
