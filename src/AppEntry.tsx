import React, { useEffect, useRef } from 'react'
import * as ReactDOM from 'react-dom'

import './AppEntry.css'
import { Button, ButtonGroup, Image, Timeline } from './mypack_components'
import { Time } from './mypack_class'
import { useBooleanState, useNumberState } from 'mypack_components/__myHooks'

import album from './assets/头像.png'
import music from './assets/ezio Family.mp3'

const App: React.FC<{
  song: string
  album: string
  totalSeconds: number
}> = prop => {
  const currentSecond = useNumberState(0)
  const isPlaying = useBooleanState(true)
  let audioPlayerRef = useRef(null)
  useEffect(() => {
    if (currentSecond.state <= prop.totalSeconds - 1) {
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
    audioPlayerRef.current && ((audioPlayerRef.current as unknown) as HTMLAudioElement).play()
  }
  const pause = () => {
    audioPlayerRef.current && ((audioPlayerRef.current as unknown) as HTMLAudioElement).pause()
  }

  return (
    <div className="app-box">
      <div className="content-space" />
      <div className="player-bar">
        <audio ref={audioPlayerRef} src={music} autoPlay loop></audio>
        <Image className="album-face" src={prop.album} />
        <ButtonGroup className="music-buttons">
          <Button className="last-song" Content="⏮" onClick={() => console.log(`I'm clicked 1`)} />
          {isPlaying.state ? (
            <Button
              className="pause"
              Content="⏸"
              onClick={() => {
                pause()
                isPlaying.off()
              }}
            />
          ) : (
            <Button
              className="play"
              Content="▶"
              onClick={() => {
                play()
                isPlaying.on()
              }}
            />
          )}
          <Button className="next-song" Content="⏭" onClick={() => console.log(`I'm clicked 3`)} />
        </ButtonGroup>
        <Timeline
          totalSeconds={prop.totalSeconds}
          currentSecond={currentSecond.state}
          Title={<div className="songName">{prop.song}</div>}
          Timestamp={`${Time(currentSecond.state).print({ format: 'MM:ss' })} / ${Time(
            prop.totalSeconds
          ).print({ format: 'MM:ss' })}`}
          onChange={incomeCurrentSecond => currentSecond.set(incomeCurrentSecond)}
        />
        <ButtonGroup className="info-panel">
          <Button className="favorite" Content="❤" onClick={() => console.log(`I'm clicked a`)} />
          <Button className="play-mode" Content="👨‍🔧" onClick={() => console.log(`I'm clicked b`)} />
          <Button className="volume" Content="🔉" onClick={() => console.log(`I'm clicked c`)} />
          <Button className="playlist" Content="📃" onClick={() => console.log(`I'm clicked d`)} />
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
