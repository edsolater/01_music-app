import React, { useEffect, useRef, useCallback, useState } from 'react'
import * as ReactDOM from 'react-dom'

import './AppEntry.css'
import { Button, ButtonGroup, Image, Timeline } from './mypack_components'
import { Time } from './mypack_class'
import { useBooleanState, useNumberState } from 'mypack_components/__myHooks'

import album from './assets/头像.png'
import music from './assets/ezio Family.mp3'

const getRefElement = ref => {
  return ref.current
}

const App: React.FC<{
  song: string
  album: string
  totalSeconds: number
}> = prop => {
  const currentSecond = useNumberState(0)
  const isPlaying = useBooleanState(false)
  const [audioPlayer, attachAudioPlayer] = useState(new Audio())
  const audioPlayerRef = useCallback(node => {
    if (node) {
      attachAudioPlayer(node)
    }
  }, [])
  useEffect(() => {
    if (currentSecond.state <= prop.totalSeconds) {
      const timeoutID = setTimeout(() => {
        if (isPlaying.state) currentSecond.add(1)
      }, 1000)
      return () => clearTimeout(timeoutID)
    } else {
      currentSecond.set(prop.totalSeconds)
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
    <div className="app-box">
      <div className="content-space" />
      <div className="player-bar">
        <audio ref={audioPlayerRef} src={music} ></audio>
        <Image className="album-face" src={prop.album} />
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
          Title={<div className="songName">{prop.song}</div>}
          Timestamp={`${Time(audioPlayer.currentTime).print({ format: 'MM:ss' })} / ${Time(
            prop.totalSeconds
          ).print({ format: 'MM:ss' })}`}
          onChange={incomeCurrentSecond => {
            currentSecond.set(incomeCurrentSecond)
          }}
          onChangeDone={incomeCurrentSecond => {
            currentSecond.set(incomeCurrentSecond)
            return audioPlayer.currentTime = incomeCurrentSecond
          }}
        />
        <ButtonGroup className="info-panel">
          <Button className="favorite" Text="❤" onClick={() => console.log(`I'm clicked a`)} />
          <Button className="play-mode" Text="👨‍🔧" onClick={() => console.log(`I'm clicked b`)} />
          <Button className="volume" Text="🔉" onClick={() => console.log(`I'm clicked c`)} />
          <Button className="playlist" Text="📃" onClick={() => console.log(`I'm clicked d`)} />
        </ButtonGroup>
      </div>
    </div>
  )
}
ReactDOM.render(
  <App
    {...{
      song: 'words-Aimer',
      album: album,
      totalSeconds: 144
    }}
  />,
  document.getElementById('root')
)
