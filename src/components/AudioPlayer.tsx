import React, { useEffect, useContext } from 'react'
import { Time } from 'mypack/class'
import './AudioPlayer.scss'
import { AppDataContext } from 'App'
import { useMaster, useCallbackRef } from 'mypack/components/customHooks'
import {
  View,
  Button,
  Image,
  Icon,
  Slider,
  Popover,
  Picture,
} from 'mypack/components/basicElements'

export default function AudioPlayer() {
  const appData = useContext(AppDataContext)
  //#region 维护播放器所含的状态信息
  const masters = {
    currentSecond: useMaster({ type: 'number', init: 0 }),
    totalSeconds: useMaster({ type: 'number' }),
    AudioPlaying: useMaster({ type: 'boolean' }),
    inLoopMode: useMaster({ type: 'boolean' }),
    volume: useMaster({ type: 'number', init: appData.playerBar.volumn ?? 1 }),
  }
  // 以下是快捷方式，因为会频繁调用，所以把内存地址暂存在变量里
  const isPlaying = masters.AudioPlaying.isOn
  const totalSeconds = masters.totalSeconds.getValue()
  //#endregion

  const [audioPlayerHTML, audioPlayerHTMLRef] = useCallbackRef(new Audio(), el => {
    el.addEventListener('canplaythrough', () => {
      masters.totalSeconds.set(Math.round(el.duration /* 不一定是整数 */))
    })
    el.volume = appData.playerBar.volumn ?? 1
  })

  // 播放器进度条
  useEffect(() => {
    if (masters.currentSecond.getValue() === 0) {
      const timeoutId = globalThis.setTimeout(() => isPlaying && masters.currentSecond.add(1), 1000)
      return () => globalThis.clearTimeout(timeoutId)
    } else if (masters.currentSecond.getValue() < totalSeconds) {
      const timeoutId = globalThis.setTimeout(() => isPlaying && masters.currentSecond.add(1), 1000)
      return () => globalThis.clearTimeout(timeoutId)
    } else {
      // end
    }
  })

  const setVolume = (newVolume: number) => {
    audioPlayerHTML.volume = newVolume
    masters.volume.set(newVolume)
  }

  return (
    <View $tag='section' className='player-bar'>
      <audio
        ref={audioPlayerHTMLRef}
        src={appData.playerBar.currentMusicInfo?.soundtrackUrl}
      ></audio>
      <Picture className='album-face' src={appData.playerBar.currentMusicInfo?.albumUrl} />
      <View className='music-buttons'>
        <Button className='last-song' onClick={() => console.log(`I'm clicked 1`)}>
          <Icon iconfontName='music_pre' />
        </Button>
        <Button
          className={isPlaying ? 'paused' : 'playing'}
          onClick={() => {
            if (audioPlayerHTML && isPlaying) {
              audioPlayerHTML.pause()
            } else if (audioPlayerHTML && !isPlaying) {
              audioPlayerHTML.play()
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
      <View className='timeline'>
        <View className='songTitle'>{appData.playerBar.currentMusicInfo?.songName}</View>
        <View className='timestamp'>{`${Time(masters.currentSecond.getValue()).print({
          format: 'MM:ss',
        })} / ${Time(totalSeconds).print({ format: 'MM:ss' })}`}</View>
        <Slider
          value={masters.currentSecond.getValue()}
          max={totalSeconds}
          onMoveTrigger={incomeCurrentSecond => {
            masters.currentSecond.set(incomeCurrentSecond)
          }}
          onMoveTriggerDone={incomeCurrentSecond => {
            masters.currentSecond.set(incomeCurrentSecond)
            audioPlayerHTML.currentTime = incomeCurrentSecond
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
              audioPlayerHTML.loop = false
            } else {
              audioPlayerHTML.loop = true
            }
          }}
        >
          <Icon iconfontName='infinit-mode' />
        </Button>
        <Popover
          Content={
            <Slider
              defaultValue={masters.volume.getValue()}
              onMoveTriggerDone={(currentPercentage: number) => {
                appData.setVolumn(currentPercentage)
                setVolume(currentPercentage)
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
