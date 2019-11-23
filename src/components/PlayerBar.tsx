import React, { useEffect } from 'react'
import { Button, ButtonGroup, Image, Slider, Popover } from 'mypack/components'
import { useCallbackRef, useMaster, useRecorder } from 'mypack/components/__customHooks'
import { Time } from 'mypack/class'
import { setClearableTimeout } from 'mypack/webToolkit'
import './PlayerBar.css'

export const PlayerBar: React.FC<{
  songTitle: string
  albumUrl: string
  soundtrackUrl: string
  initVolume?: number
}> = (props) => {
  //#region 维护播放器所含的状态信息
  const state = {
    soundtrack: {
      currentSecond: useRecorder({ type: 'counter', init: 0 }),
      totalSeconds: useRecorder({ type: 'counter' }),
      isPlaying: useRecorder({ type: 'on-off-reporter' }),
    },
    volume: useRecorder({ type: 'counter(percentage)', init: props.initVolume || 1 }),
    volumePanel: useMaster({ type: 'open-close' }),
  }
  // 以下是快捷方式，因为会频繁调用，所以把内存地址暂存在变量里
  const currentSecond = state.soundtrack.currentSecond
  const isPlaying = state.soundtrack.isPlaying
  const totalSeconds = state.soundtrack.totalSeconds.value
  //#endregion

  const [audioPlayerHTML, audioPlayerHTMLRef] = useCallbackRef(new Audio(), (el) => {
    el.addEventListener('canplaythrough', () => {
      state.soundtrack.totalSeconds.set(Math.round(el.duration /* 不一定是整数 */))
    })
    el.volume = props.initVolume || 1
  })
  const [volumePanel, volumnPanelRef] = useCallbackRef(document.createElement('div'))
  // 播放器进度条
  useEffect(() => {
    if (Number.isNaN(totalSeconds)) {
      // audio isn't ready yet
    } else if (currentSecond.value === 0) {
      // begin
      return setClearableTimeout(() => isPlaying.isOpen && currentSecond.add(1), 1000)
    } else if (currentSecond.value < totalSeconds) {
      // ongoing
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
    <div className="player-bar">
      <audio ref={audioPlayerHTMLRef} src={props.soundtrackUrl}></audio>
      <Image className="album-face" src={props.albumUrl} />
      <ButtonGroup className="music-buttons">
        <Button className="last-song" Content="⏮" onClick={() => console.log(`I'm clicked 1`)} />
        {isPlaying.isTrue ? (
          <Button
            className="pause"
            Content="⏸"
            onClick={() => {
              if (audioPlayerHTML) audioPlayerHTML.pause()
              isPlaying.turnOff()
            }}
          />
        ) : (
          <Button
            className="play"
            Content="▶"
            onClick={() => {
              if (audioPlayerHTML) audioPlayerHTML.play()
              isPlaying.turnOn()
            }}
          />
        )}
        <Button className="next-song" Content="⏭" onClick={() => console.log(`I'm clicked 3`)} />
      </ButtonGroup>
      <div className="timeline">
        <div className="songTitle">{props.songTitle}</div>
        <div className="timestamp">{`${Time(currentSecond.value).print({
          format: 'MM:ss',
        })} / ${Time(totalSeconds).print({ format: 'MM:ss' })}`}</div>
        <Slider
          value={currentSecond.value}
          total={totalSeconds}
          on={{
            moveTrigger: (incomeCurrentSecond) => {
              currentSecond.set(incomeCurrentSecond)
            },
            moveTriggerDone: (incomeCurrentSecond) => {
              currentSecond.set(incomeCurrentSecond)
              audioPlayerHTML.currentTime = incomeCurrentSecond
            },
          }}
        />
      </div>
      <ButtonGroup className="info-panel">
        <Button className="favorite" Content="❤" onClick={() => console.log(`I'm clicked a`)} />
        <Button //这个按钮应该控制App的行为 而不是播放器的
          className="play-mode"
          Content="🔁"
          modes={['on', 'off']}
          on={{
            click: (_, switchToNextMode) => {
              switchToNextMode!()
            },
            modeChange: (newMode) => {
              if (newMode === 'on') {
                audioPlayerHTML.loop = true
              } else if (newMode === 'off') {
                audioPlayerHTML.loop = false
              }
            },
          }}
        />
        <Button
          className="volume"
          Content="🔉"
          onPointerEnter={() => {
            state.volumePanel.show()
            state.volumePanel.dismissDeferHide()
          }}
          onPointerLeave={() => {
            state.volumePanel.deferHide()
          }}
        />
        <Popover className="volume-panel" showHideObject={state.volumePanel}>
          <Slider
            defaultValue={state.volume.value}
            on={{
              moveTriggerDone: (currentPercentage: number) => {
                console.log('currentPercentage: ', currentPercentage)
                setVolume(currentPercentage)
              },
            }}
          />
        </Popover>
        <Button className="playlist" Content="📃" onClick={() => console.log(`I'm clicked d`)} />
      </ButtonGroup>
    </div>
  )
}
