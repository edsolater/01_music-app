import React, { useEffect } from 'react'
import { Button, ButtonGroup, Image, Track, Popover } from 'mypack/components'
import {
  useCallbackRef,
  useComponentMaster,
  useStateRecorder,
} from 'mypack/components/__customHooks'
import { Time } from 'mypack/class'
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
      currentSecond: useStateRecorder({ type: 'counter', init: 0 }),
      totalSeconds: useStateRecorder({ type: 'counter' }),
      isPlaying: useStateRecorder({ type: 'on-off-reporter' }),
    },
    volume: useStateRecorder({ type: 'counter(percentage)', init: props.initVolume || 1 }),
    volumePanel: useComponentMaster({ type: 'open-close' }),
  }
  // 以下是快捷方式，因为会平凡调用，所以把内存地址暂存在变量里
  const currentSecond = state.soundtrack.currentSecond
  const isPlaying = state.soundtrack.isPlaying
  const songLength = state.soundtrack.totalSeconds
  //#endregion

  const [audioPlayer, audioPlayerRef] = useCallbackRef(new Audio(), (el) => {
    el.addEventListener('canplaythrough', () => {
      state.soundtrack.totalSeconds.set(el.duration)
    })
  })
  const [volumePanel, volumnPanelRef] = useCallbackRef(document.createElement('div'))
  useEffect(() => {
    if (Number.isNaN(songLength.value)) {
      console.log("audio isn't ready")
    } else if (currentSecond.value <= songLength.value) {
      const timeoutID = window.setTimeout(() => isPlaying.isOpen && currentSecond.add(1), 1000)
      return () => window.clearTimeout(timeoutID)
    } else {
      currentSecond.set(songLength.value)
      console.log('end')
    }
  })
  const play = () => {
    if (audioPlayer) audioPlayer.play()
  }
  const pause = () => {
    if (audioPlayer) audioPlayer.pause()
  }
  const setVolume = (newVolume: number) => {
    audioPlayer.volume = newVolume
    state.volume.set(newVolume)
  }
  return (
    <div className="player-bar">
      <audio ref={audioPlayerRef} src={props.soundtrackUrl}></audio>
      <Image className="album-face" src={props.albumUrl} />
      <ButtonGroup className="music-buttons">
        <Button className="last-song" Content="⏮" onClick={() => console.log(`I'm clicked 1`)} />
        {isPlaying.isTrue ? (
          <Button
            className="pause"
            Content="⏸"
            onClick={() => {
              pause()
              isPlaying.turnOff()
            }}
          />
        ) : (
          <Button
            className="play"
            Content="▶"
            onClick={() => {
              play()
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
        })} / ${Time(songLength.value).print({ format: 'MM:ss' })}`}</div>
        <Track
          value={currentSecond.value}
          total={songLength.value}
          onChange={(incomeCurrentSecond) => {
            currentSecond.set(incomeCurrentSecond)
          }}
          onChangeDone={(incomeCurrentSecond) => {
            currentSecond.set(incomeCurrentSecond)
            audioPlayer.currentTime = incomeCurrentSecond
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
                audioPlayer.loop = true
              } else if (newMode === 'off') {
                audioPlayer.loop = false
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
        <Popover
          className="volume-panel"
          showHideObject={state.volumePanel} /* volumnPanelRef={volumnPanelRef} */
        ></Popover>
        <Button className="playlist" Content="📃" onClick={() => console.log(`I'm clicked d`)} />
      </ButtonGroup>
    </div>
  )
}
