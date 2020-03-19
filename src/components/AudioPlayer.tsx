import React, { useEffect, useRef, useReducer, Reducer } from 'react'

import { Time } from 'mypack/class'
import './AudioPlayer.scss'
import { useElement } from 'mypack/components/customHooks'
import { View, Button, Icon, Slider, Popover, Picture, Text } from 'mypack/components/lower'
import { useTypedStoreSelector } from 'store'

export default function AudioPlayer() {
  const playerBarData = useTypedStoreSelector(state => state.playerBar)

  // 播放器进度条
  useEffect(() => {
    const timeoutId = globalThis.setTimeout(() => {
      if (thisData.isPlaying) {
        dataDispatcher({ type: 'go on 1 second' })
      }
    }, 1000)
    return () => globalThis.clearTimeout(timeoutId)
  })

  const audioElement = useElement('audio', el => {
    el.volume = playerBarData.volumn
    el.src = String(playerBarData.currentMusicInfo?.soundtrackUrl)
  })
  const currentSecondRef = useRef<HTMLSpanElement>()
  const [thisData, dataDispatcher] = useReducer<
    Reducer<
      {
        currentSecond: number
        isPlaying: boolean
        inLoopMode: boolean
      },
      {
        type:
          | 'go on 1 second'
          | 'reset music progress'
          | 'set music progress'
          | 'play the song'
          | 'pause the song'
          | 'toggle loop mode'
        //FIXME:这是一个‘set music progress’ 特异属性，应该是有条件的必选项
        newSecond?: number
        [any: string]: unknown
      }
    >
  >(
    (data, action) => {
      switch (action.type) {
        case 'go on 1 second': {
          const oldSecond = data.currentSecond
          const newSecond = Math.max(
            0,
            Math.min(oldSecond + 1, playerBarData.currentMusicInfo.totalSeconds),
          )
          return { ...data, currentSecond: newSecond }
        }
        case 'reset music progress': {
          return { ...data, currentSecond: 0 }
        }
        case 'play the song': {
          return { ...data, isPlaying: true }
        }
        case 'pause the song': {
          return { ...data, isPlaying: false }
        }
        case 'toggle loop mode': {
          return { ...data, inLoopMode: !data.inLoopMode }
        }
        case 'set music progress': {
          audioElement.currentTime = action.newSecond ?? 0
          return { ...data, currentSecond: action.newSecond ?? 0 }
        }
      }
    },
    { currentSecond: 0, isPlaying: false, inLoopMode: false },
  )
  return (
    <View $tag='section' className='player-bar'>
      <Picture className='album-face' src={playerBarData.currentMusicInfo?.albumUrl} />
      <View className='music-buttons'>
        <Button className='last-song' onClick={() => console.log(`I'm clicked 1`)}>
          <Icon iconfontName='music_pre' />
        </Button>
        <Button
          className={thisData.isPlaying ? 'paused' : 'playing'}
          onClick={() => {
            //FIXME: 这种冗余的存在影响可读性，要去掉
            if (thisData.isPlaying) {
              audioElement.pause()
              dataDispatcher({ type: 'pause the song' })
            } else {
              audioElement.play()
              dataDispatcher({ type: 'play the song' })
            }
          }}
        >
          {thisData.isPlaying ? <Icon iconfontName='pause' /> : <Icon iconfontName='play' />}
        </Button>
        <Button className='next-song' onClick={() => console.log(`I'm clicked 3`)}>
          <Icon iconfontName='music_next' />
        </Button>
      </View>
      <View className='timeSlider'>
        <View className='songTitle'>{playerBarData.currentMusicInfo?.songName}</View>
        <View className='timestamp'>
          <Text ref={currentSecondRef}>{Time(thisData.currentSecond).format('MM:ss')}</Text>
          <Text className='divider'> / </Text>
          <Text>{Time(Number(playerBarData.currentMusicInfo?.totalSeconds)).format('MM:ss')}</Text>
        </View>
        <Slider
          value={thisData.currentSecond}
          max={Number(playerBarData.currentMusicInfo?.totalSeconds)}
          onMoveTrigger={incomeCurrentSecond => {
            if (currentSecondRef.current) {
              currentSecondRef.current.textContent = Time(incomeCurrentSecond).format('MM:ss')
            }
          }}
          onMoveTriggerDone={incomeCurrentSecond => {
            dataDispatcher({ type: 'set music progress', newSecond: incomeCurrentSecond })
          }}
        />
      </View>
      <View className='info-panel'>
        <Button className='favorite'>
          <Icon iconfontName='heart_empty' />
        </Button>
        {/* TODO: 轮流切换的Button，需要单独再封一个组件，这种模式经常用到 */}
        <Button
          className={['play-mode', thisData.inLoopMode ? 'on' : 'off']}
          onClick={() => {
            dataDispatcher({ type: 'toggle loop mode' })
            if (thisData.inLoopMode) {
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
