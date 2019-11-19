import React, { useEffect } from 'react'
import { Button, ButtonGroup, Image, Track } from '../mypack_components'
import { Time } from '../mypack_class'
import { useBooleanState, useNumberState, useCallbackRef } from 'mypack_components/__myHooks'
import './PlayerBar.css'

export const PlayerBar: React.FC<{
  songTitle: string
  albumUrl: string
  soundtrackUrl: string
  initVolume?: number
}> = props => {

  //#region 维护播放器所含的状态信息
  const state = {
    soundtrack: {
      currentSecond: useNumberState(0),
      isPlaying: useBooleanState(false),
      length: useNumberState(NaN)
    },
    /**
     * 只能0到1之间
     */
    volume: {
      state: useNumberState(props.initVolume || 1),
      get value(): number {
        return this.state.value
      },
      hasPanel: useBooleanState(false)
    },
    mode: ''
  }
  // 以下是快捷方式，因为会平凡调用，所以把内存地址暂存在变量里
  const currentSecond = state.soundtrack.currentSecond
  const isPlaying = state.soundtrack.isPlaying
  const hasVolumePanel = state.volume.hasPanel
  const volume = state.volume.state
  const songLength = state.soundtrack.length
  //#endregion

  const [audioPlayer, audioPlayerRef] = useCallbackRef(new Audio(), el => {
    el.addEventListener('canplaythrough', () => {
      songLength.set(el.duration)
    })
  })
  useEffect(() => {
    if (Number.isNaN(songLength.value)) {
      console.log("audio isn't ready")
    } else if (currentSecond.value <= songLength.value) {
      const timeoutID = setTimeout(() => isPlaying.isTrue && currentSecond.add(1), 1000)
      return () => clearTimeout(timeoutID)
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
    volume.set(newVolume)
  }
  const getVolume = () => volume.value
  return (
    <div className="player-bar">
      <audio ref={audioPlayerRef} src={props.soundtrackUrl}></audio>
      <Image className="album-face" src={props.albumUrl} />
      <ButtonGroup className="music-buttons">
        <Button className="last-song" Text="⏮" onClick={() => console.log(`I'm clicked 1`)} />
        {isPlaying.isTrue ? (
          <Button
            className="pause"
            Text="⏸"
            onClick={() => {
              pause()
              isPlaying.off()
            }}
          />
        ) : (
          <Button
            className="play"
            Text="▶"
            onClick={() => {
              play()
              isPlaying.on()
            }}
          />
        )}
        <Button className="next-song" Text="⏭" onClick={() => console.log(`I'm clicked 3`)} />
      </ButtonGroup>
      <div className="timeline">
        <div className="songTitle">{props.songTitle}</div>
        <div className="timestamp">{`${Time(currentSecond.value).print({
          format: 'MM:ss'
        })} / ${Time(songLength.value).print({ format: 'MM:ss' })}`}</div>
        <Track
          value={currentSecond.value}
          total={songLength.value}
          onChange={incomeCurrentSecond => {
            currentSecond.set(incomeCurrentSecond)
          }}
          onChangeDone={incomeCurrentSecond => {
            currentSecond.set(incomeCurrentSecond)
            audioPlayer.currentTime = incomeCurrentSecond
          }}
        />
      </div>
      <ButtonGroup className="info-panel">
        <Button className="favorite" Text="❤" onClick={() => console.log(`I'm clicked a`)} />
        <Button //这个按钮应该控制App的行为 而不是播放器的
          className="play-mode"
          Text="🔁"
          modes={['on', 'off']}
          onClick={(_, switchToNextMode) => {
            switchToNextMode!()
          }}
          onModeChange={newMode => {
            if (newMode === 'on') {
              audioPlayer.loop = true
            } else if (newMode === 'off') {
              audioPlayer.loop = false
            }
          }}
        />
        <Button className="volume" Text="🔉" onClick={() => console.log(`I'm clicked c`)} />
        <Button className="playlist" Text="📃" onClick={() => console.log(`I'm clicked d`)} />
      </ButtonGroup>
    </div>
  )
}
