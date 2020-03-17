import React, { useEffect, useRef } from 'react'

import { Time } from 'mypack/class'
import './AudioPlayer.scss'
import { useMaster, useElement } from 'mypack/components/customHooks'
import { View, Button, Icon, Slider, Popover, Picture, Text } from 'mypack/components/lower'
import { useTypedStoreSelector } from 'store'

export default function AudioPlayer() {
  const playerBarData = useTypedStoreSelector(state => state.playerBar)
  //#region 维护播放器所含的状态信息
  const masters = {
    currentSecond: useMaster({ type: 'number', init: 0 }),
    AudioPlaying: useMaster({ type: 'boolean' }),
    inLoopMode: useMaster({ type: 'boolean' }),
  }
  // 以下是快捷方式，因为会频繁调用，所以把内存地址暂存在变量里
  const isPlaying = masters.AudioPlaying.isOn
  const totalSeconds = Number(playerBarData.currentMusicInfo?.totalSeconds)
  //#endregion

  // 播放器进度条
  useEffect(() => {
    if (masters.currentSecond.value === 0) {
      const timeoutId = globalThis.setTimeout(() => isPlaying && masters.currentSecond.add(1), 1000)
      return () => globalThis.clearTimeout(timeoutId)
    } else if (masters.currentSecond.value < totalSeconds) {
      const timeoutId = globalThis.setTimeout(() => isPlaying && masters.currentSecond.add(1), 1000)
      return () => globalThis.clearTimeout(timeoutId)
    } else {
      // end
    }
  })

  const audioElement = useElement('audio', el => {
    el.volume = playerBarData.volumn
    el.src = String(playerBarData.currentMusicInfo?.soundtrackUrl)
  })
  const setVolumeByUI = (newVolume: number) => {
    audioElement.volume = newVolume
  }
  const currentSecondRef = useRef<HTMLSpanElement>()
  return (
    <View $tag='section' className='player-bar'>
      <Picture className='album-face' src={playerBarData.currentMusicInfo?.albumUrl} />
      <View className='music-buttons'>
        <Button className='last-song' onClick={() => console.log(`I'm clicked 1`)}>
          <Icon iconfontName='music_pre' />
        </Button>
        <Button
          className={isPlaying ? 'paused' : 'playing'}
          onClick={() => {
            //FIXME: 这种冗余的存在影响可读性，要去掉
            if (isPlaying) {
              audioElement.pause()
            } else {
              audioElement.play()
            }
            masters.AudioPlaying.toggle()
          }}
        >
          {isPlaying ? <Icon iconfontName='pause' /> : <Icon iconfontName='play' />}
        </Button>
        <Button className='next-song' onClick={() => console.log(`I'm clicked 3`)}>
          <Icon iconfontName='music_next' />
        </Button>
      </View>
      <View className='timeSlider'>
        <View className='songTitle'>{playerBarData.currentMusicInfo?.songName}</View>
        <View className='timestamp'>
          <Text ref={currentSecondRef}>{Time(masters.currentSecond.value).format('MM:ss')}</Text>
          <Text className='divider'> / </Text>
          <Text>{Time(totalSeconds).format('MM:ss')}</Text>
        </View>
        <Slider
          value={masters.currentSecond.value}
          max={totalSeconds}
          onMoveTrigger={incomeCurrentSecond => {
            if (currentSecondRef.current) {
              currentSecondRef.current.textContent = Time(incomeCurrentSecond).format('MM:ss')
            }
          }}
          onMoveTriggerDone={incomeCurrentSecond => {
            masters.currentSecond.set(incomeCurrentSecond)
            audioElement.currentTime = incomeCurrentSecond
          }}
        />
      </View>
      <View className='info-panel'>
        <Button className='favorite'>
          <Icon iconfontName='heart_empty' />
        </Button>
        {/* TODO: 轮流切换的Button，需要单独再封一个组件，这种模式经常用到 */}
        <Button
          className={['play-mode', { on: masters.inLoopMode.isOn, off: masters.inLoopMode.isOff }]}
          onClick={() => {
            masters.inLoopMode.toggle()
            if (masters.inLoopMode) {
              audioElement.loop = false
            } else {
              audioElement.loop = true
            }
          }}
        >
          <Icon iconfontName='infinit-mode' />
        </Button>
        <Popover
          Content={
            <Slider
              defaultValue={playerBarData.volumn}
              onMoveTriggerDone={(currentPercentage: number) => {
                // FIXME appData.setVolumn(currentPercentage)
                setVolumeByUI(currentPercentage)
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
