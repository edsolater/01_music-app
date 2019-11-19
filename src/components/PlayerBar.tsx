import React, { useEffect } from 'react'
import { Button, ButtonGroup, Image, Track } from '../mypack_components'
import { Time } from '../mypack_class'
import { useBooleanState, useNumberState, useCallbackRef } from 'mypack_components/__myHooks'
import './PlayerBar.css'

export const PlayerBar: React.FC<{
  songTitle: string
  albumUrl: string
  soundtrackUrl: string
}> = props => {
  const currentSecond = useNumberState(0)
  const isPlaying = useBooleanState(false)
  const hasVolumePanel = useBooleanState(false)
  /**
   * 只能0到1之间
   */
  const volume = useNumberState(1)
  const songLength = useNumberState(NaN)
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
        <Button className="play-mode" Text="👨‍🔧" onClick={() => console.log(`I'm clicked b`)} />
        <Button className="volume" Text="🔉" onClick={() => console.log(`I'm clicked c`)} />
        <Button className="playlist" Text="📃" onClick={() => console.log(`I'm clicked d`)} />
      </ButtonGroup>
    </div>
  )
}
