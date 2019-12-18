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
  CrustSwitcher,
} from 'mypack/basic_components'
import { Time } from 'mypack/class'
import { setClearableTimeout } from 'mypack/webToolkit'
import './PlayerBar.less'

export function PlayerBar({
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
    currentSecond: useMaster({ type: 'counter', init: 0 }),
    totalSeconds: useMaster({ type: 'counter' }),
    isPlaying: useMaster({ type: 'on-off-reporter' }),
    volume: useMaster({ type: 'counter(percentage)', init: defaultVolume || 1 }),
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
        <Button
          className='last-song'
          Slot_Content='⏮'
          onClick={() => console.log(`I'm clicked 1`)}
        />
        {isPlaying.isTrue ? (
          <Button
            className='pause'
            Slot_Content='⏸'
            onClick={() => {
              if (audioPlayerHTML) audioPlayerHTML.pause()
              isPlaying.turnOff()
            }}
          />
        ) : (
          <Button
            className='play'
            Slot_Content='▶'
            onClick={() => {
              if (audioPlayerHTML) audioPlayerHTML.play()
              isPlaying.turnOn()
            }}
          />
        )}
        <Button
          className='next-song'
          Slot_Content='⏭'
          onClick={() => console.log(`I'm clicked 3`)}
        />
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
        <Button
          className='favorite'
          Slot_Content='❤'
          onClick={() => console.log(`I'm clicked a`)}
        />
        <CrustSwitcher
          onToggle={(newStatus) => {
            if (newStatus === 'dd') {
              audioPlayerHTML.loop = true
            } else if (newStatus === 'cc') {
              audioPlayerHTML.loop = false
            }
          }}
        >
          <Button //这个按钮应该控制App的行为 而不是播放器的
            className='play-mode'
            Slot_Content='🔁'
          />
        </CrustSwitcher>
        <Popover
          className='volume-panel'
          Slot_Content={
            <Slider
              defaultValue={state.volume.value}
              onMoveTriggerDone={(currentPercentage: number) => {
                console.log('currentPercentage: ', currentPercentage)
                setVolume(currentPercentage)
              }}
            />
          }
        >
          <Button className='volume' Slot_Content='🔉' />
        </Popover>
        <Button
          className='playlist'
          Slot_Content='📃'
          onClick={() => console.log(`I'm clicked d`)}
        />
      </Group>
    </View>
  )
}
