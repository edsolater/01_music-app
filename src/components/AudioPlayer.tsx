import React, { useEffect } from 'react'
import {
  Button,
  Group,
  Image,
  Slider,
  Popover,
  useMaster,
  useCallbackRef,
  View,
} from 'mypack/basic_components'
import { Time } from 'mypack/class'
import { setClearableTimeout } from 'mypack/webToolkit'
import './AudioPlayer.scss'

export default function AudioPlayer({
  defaultVolume,
  soundtrackUrl,
  albumUrl,
  songTitle,
}: {
  songTitle: string
  albumUrl: string
  soundtrackUrl: string
  defaultVolume?: number
}) {
  //#region 维护播放器所含的状态信息
  const state = {
    currentSecond: useMaster({ type: 'number', init: 0 }),
    totalSeconds: useMaster({ type: 'number' }),
    isPlaying: useMaster({ type: 'boolean' }),
    inLoopMode: useMaster({ type: 'boolean' }),
    volume: useMaster({ type: 'number', init: defaultVolume || 1 }),
  }
  // 以下是快捷方式，因为会频繁调用，所以把内存地址暂存在变量里
  const currentSecond = state.currentSecond
  const isPlaying = state.isPlaying
  const totalSeconds = state.totalSeconds.value
  //#endregion

  const [audioPlayerHTML, audioPlayerHTMLRef] = useCallbackRef(new Audio(), (el) => {
    el.addEventListener('canplaythrough', () => {
      state.totalSeconds.set(Math.round(el.duration /* 不一定是整数 */))
    })
    el.volume = defaultVolume || 1
  })
  // 播放器进度条
  useEffect(() => {
    if (Number.isNaN(totalSeconds)) {
      // audio isn't ready yet
    } else if (currentSecond.value === 0) {
      // begin
      return setClearableTimeout(() => isPlaying.isOpen && currentSecond.add(1), 1000)
    } else if (currentSecond.value < totalSeconds) {
      // 播放正在进行中
      return setClearableTimeout(() => isPlaying.isOpen && currentSecond.add(1), 1000)
    } else {
      // end
    }
  })

  const setVolume = (newVolume: number) => {
    audioPlayerHTML.volume = newVolume
    state.volume.set(newVolume)
  }
  return (
    <View className='player-bar'>
      <audio ref={audioPlayerHTMLRef} src={soundtrackUrl}></audio>
      <Image className='album-face' src={albumUrl} />
      <Group className='music-buttons'>
        <Button className='last-song' onClick={() => console.log(`I'm clicked 1`)}>
          ⏮
        </Button>
        <Button
          className={isPlaying.isTrue ? 'pause' : 'play'}
          onClick={() => {
            if (audioPlayerHTML && isPlaying.isTrue) {
              audioPlayerHTML.pause()
            } else if (audioPlayerHTML && isPlaying.isFalse) {
              audioPlayerHTML.play()
            }
            isPlaying.toggle()
          }}
        >
          {isPlaying.isTrue ? '⏸' : '▶'}
        </Button>
        <Button className='next-song' onClick={() => console.log(`I'm clicked 3`)}>
          ⏭
        </Button>
      </Group>
      <View className='timeline'>
        <View className='songTitle'>{songTitle}</View>
        <View className='timestamp'>{`${Time(currentSecond.value).print({
          format: 'MM:ss',
        })} / ${Time(totalSeconds).print({ format: 'MM:ss' })}`}</View>
        <Slider
          value={currentSecond.value}
          max={totalSeconds}
          onMoveTrigger={(incomeCurrentSecond) => {
            currentSecond.set(incomeCurrentSecond)
          }}
          onMoveTriggerDone={(incomeCurrentSecond) => {
            currentSecond.set(incomeCurrentSecond)
            audioPlayerHTML.currentTime = incomeCurrentSecond
          }}
        />
      </View>
      <Group className='info-panel'>
        <Button className='favorite'>❤</Button>
        <Button
          className={['play-mode', { on: state.inLoopMode.isOn, off: state.inLoopMode.isOff }]}
          onClick={() => {
            state.inLoopMode.toggle()
            if (state.inLoopMode) {
              audioPlayerHTML.loop = false
            } else {
              audioPlayerHTML.loop = true
            }
          }}
        >
          🔁
        </Button>
        <Popover
          Content={
            <Slider
              defaultValue={state.volume.value}
              onMoveTriggerDone={(currentPercentage: number) => {
                console.log('currentPercentage: ', currentPercentage)
                setVolume(currentPercentage)
              }}
            />
          }
        >
          <Button className='volume'>🔉</Button>
        </Popover>
        <Button className='playlist' onClick={() => console.log(`I'm clicked d`)}>
          📃
        </Button>
      </Group>
    </View>
  )
}
