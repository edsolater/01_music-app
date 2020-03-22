import React, { useEffect, useRef, useReducer, Reducer } from 'react'

import { Time } from 'mypack/class'
import './AudioPlayer.scss'
import { useElement } from 'mypack/components/customHooks'
import { View, Button, Icon, Slider, Popover, Picture, Text } from 'mypack/components/lower'
import { useTypedStoreSelector } from 'store'
import { CycleView } from 'mypack/components/wrappers'

export default function AudioPlayer() {
  const playerBar = useTypedStoreSelector(store => store.playerBar)
  const audioElement = useElement('audio', el => {
    el.volume = playerBar.volumn
    el.src = String(playerBar.currentMusicInfo?.soundtrackUrl)
  })
  const currentSecondRef = useRef<HTMLSpanElement>()
  //FIXME要抽象成useMethod
  const [data, dataDispatcher] = useReducer<
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
            Math.min(oldSecond + 1, playerBar.currentMusicInfo.totalSeconds),
          )
          return { ...data, currentSecond: newSecond }
        }
        case 'reset music progress': {
          return { ...data, currentSecond: 0 }
        }
        case 'play the song': {
          audioElement.play()
          return { ...data, isPlaying: true }
        }
        case 'pause the song': {
          audioElement.pause()
          return { ...data, isPlaying: false }
        }
        case 'toggle loop mode': {
          audioElement.loop = !audioElement.loop
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

  // 播放器进度条
  useEffect(() => {
    const timeoutId = globalThis.setTimeout(() => {
      if (data.isPlaying) {
        dataDispatcher({ type: 'go on 1 second' })
      }
    }, 1000)
    return () => globalThis.clearTimeout(timeoutId)
  })
  return (
    <View $tag='section' className='player-bar'>
      <Picture className='album-face' src={playerBar.currentMusicInfo?.albumUrl} />
      <View className='music-buttons'>
        <Button className='last-song' onClick={() => console.log(`I'm clicked 1`)}>
          <Icon iconfontName='music_pre' />
        </Button>
        <Button
          className={data.isPlaying ? 'paused' : 'playing'}
          onClick={() => {
            dataDispatcher({ type: data.isPlaying ? 'pause the song' : 'play the song' })
          }}
        >
          {data.isPlaying ? <Icon iconfontName='pause' /> : <Icon iconfontName='play' />}
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
        <CycleView
          className='indicator-like'
          initActiveName='infinit-mode' //TODO: 这里还缺个智能提示，但是可有可无
          itemList={[
            {
              node: <Icon iconfontName='random-mode' />,
              activeName: 'random-mode',
              onActive: () => {},
            },
            {
              node: <Icon iconfontName='infinit-mode' />,
              activeName: 'infinit-mode',
              onActive: () => dataDispatcher({ type: 'toggle loop mode' }), //TODO: 这只是临时的，toggle loop mode
            },
            {
              node: <Icon iconfontName='recursive-mode' />,
              activeName: 'recursive-mode',
              onActive: () => {},
            },
          ]}
        />
        <Popover
          Content={
            <Slider
              defaultValue={playerBar.volumn}
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
