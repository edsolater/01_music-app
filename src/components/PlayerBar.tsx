import React, { useEffect, useCallback, useState } from 'react'
import { Button, ButtonGroup, Image, Timeline } from '../mypack_components'
import { Time } from '../mypack_class'
import { useBooleanState, useNumberState } from 'mypack_components/__myHooks'
import './PlayerBar.css'

export const PlayerBar: React.FC<{
  songTitle: string
  albumUrl: string
  soundtrackUrl:string
  totalSeconds: number
}> = props => {
  const currentSecond = useNumberState(0)
  const isPlaying = useBooleanState(false)
  const [audioPlayer, attachAudioPlayer] = useState(new Audio())
  const audioPlayerRef = useCallback(node => {
    if (node) {
      attachAudioPlayer(node)
    }
  }, [])
  useEffect(() => {
    if (currentSecond.state <= props.totalSeconds) {
      const timeoutID = setTimeout(() => {
        if (isPlaying.state) currentSecond.add(1)
      }, 1000)
      return () => clearTimeout(timeoutID)
    } else {
      currentSecond.set(props.totalSeconds)
      console.log('end')
    }
  })
  const play = () => {
    if (audioPlayer) audioPlayer.play()
  }
  const pause = () => {
    if (audioPlayer) audioPlayer.pause()
  }
  return (
    <div className="player-bar">
      <audio ref={audioPlayerRef} src={props.soundtrackUrl}></audio>
      <Image className="album-face" src={props.albumUrl} />
      <ButtonGroup className="music-buttons">
        <Button className="last-song" Text="⏮" onClick={() => console.log(`I'm clicked 1`)} />
        {isPlaying.state ? (
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
      <Timeline
        totalSeconds={audioPlayer.duration}
        currentSecond={currentSecond.state}
        Title={<div className="songName">{props.songTitle}</div>}
        Timestamp={`${Time(audioPlayer.currentTime).print({ format: 'MM:ss' })} / ${Time(
          props.totalSeconds
        ).print({ format: 'MM:ss' })}`}
        onChange={incomeCurrentSecond => {
          currentSecond.set(incomeCurrentSecond)
        }}
        onChangeDone={incomeCurrentSecond => {
          currentSecond.set(incomeCurrentSecond)
          return (audioPlayer.currentTime = incomeCurrentSecond)
        }}
      />
      <ButtonGroup className="info-panel">
        <Button className="favorite" Text="❤" onClick={() => console.log(`I'm clicked a`)} />
        <Button className="play-mode" Text="👨‍🔧" onClick={() => console.log(`I'm clicked b`)} />
        <Button className="volume" Text="🔉" onClick={() => console.log(`I'm clicked c`)} />
        <Button className="playlist" Text="📃" onClick={() => console.log(`I'm clicked d`)} />
      </ButtonGroup>
    </div>
  )
}
