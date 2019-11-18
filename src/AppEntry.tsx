import React, { useState, useEffect } from 'react'
import * as ReactDOM from 'react-dom'

import './AppEntry.css'
import { Button, ButtonGroup, Image, Timeline } from './mypack_components'
import { Time } from './mypack-class'
import album from './assets/头像.png'
import { useBooleanState } from 'mypack_components/__myHooks'

const App: React.FC<{
  song: string
  album: string
  totalSeconds: number
}> = prop => {
  const [currentSecond, setCurrentSecond] = useState(0)
  const onGoing = useBooleanState(true)
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (onGoing.state) {
        if (currentSecond >= prop.totalSeconds) {
          console.log("it's end")
        } else {
          setCurrentSecond(currentSecond + 1)
        }
      }
    }, 1000)
    // 以此把UI的控制权交给react，而不是Dom
    return () => clearTimeout(timeoutID)
  })

  return (
    <div className="temp-grid-item">
      <div className="player-bar">
        <Image className="album-face" src={prop.album} />
        <ButtonGroup className="music-buttons">
          <Button className="last-track" Content="⏮" onClick={() => console.log(`I'm clicked 1`)} />
          <Button className="play-pause" Content="⏯" onClick={() => onGoing.toggle()} />
          <Button className="next-track" Content="⏭" onClick={() => console.log(`I'm clicked 3`)} />
        </ButtonGroup>
        <Timeline
          LeftLabel={<div className="songName">{prop.song}</div>}
          RightLabel={`${Time(currentSecond).print({ format: 'MM:ss' })} / ${prop.totalSeconds}`}
          totalSeconds={prop.totalSeconds}
          currentSecond={currentSecond}
          onChange={currentSecond => setCurrentSecond(currentSecond)}
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
      totalSeconds: 223
    }}
  />,
  document.getElementById('root')
)
