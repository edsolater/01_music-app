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
  __Switcher__,
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
    <View slotName='player-bar'>
      <audio ref={audioPlayerHTMLRef} src={soundtrackUrl}></audio>
      <Image slotName='album-face' src={albumUrl} />
      <Group slotName='music-buttons'>
        <Button
          slotName='last-song'
          Slot_Content='⏮'
          onClick={() => console.log(`I'm clicked 1`)}
        />
        {isPlaying.isTrue ? (
          <Button
            slotName='pause'
            Slot_Content='⏸'
            onClick={() => {
              if (audioPlayerHTML) audioPlayerHTML.pause()
              isPlaying.turnOff()
            }}
          />
        ) : (
          <Button
            slotName='play'
            Slot_Content='▶'
            onClick={() => {
              if (audioPlayerHTML) audioPlayerHTML.play()
              isPlaying.turnOn()
            }}
          />
        )}
        <Button
          slotName='next-song'
          Slot_Content='⏭'
          onClick={() => console.log(`I'm clicked 3`)}
        />
      </Group>
      <View slotName='timeline'>
        <View slotName='songTitle'>{songTitle}</View>
        <View slotName='timestamp'>{`${Time(currentSecond.value).print({
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
      <Group slotName='info-panel'>
        <Button
          slotName='favorite'
          Slot_Content='❤'
          onClick={() => console.log(`I'm clicked a`)}
        />
        <__Switcher__
          onToggle={(newStatus) => {
            if (newStatus === 'dd') {
              audioPlayerHTML.loop = true
            } else if (newStatus === 'cc') {
              audioPlayerHTML.loop = false
            }
          }}
        >
          <Button //这个按钮应该控制App的行为 而不是播放器的
            slotName='play-mode'
            Slot_Content='🔁'
          />
        </__Switcher__>
        <Popover
          slotName='volume-panel'
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
          <Button slotName='volume' Slot_Content='🔉' />
        </Popover>
        <Button
          slotName='playlist'
          Slot_Content='📃'
          onClick={() => console.log(`I'm clicked d`)}
        />
      </Group>
    </View>
  )
}
