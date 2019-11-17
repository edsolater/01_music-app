import React, { useState } from 'react'
import * as ReactDOM from 'react-dom'

import './AppEntry.css'
import { Button, ButtonGroup, Image, Timeline } from './mypack_components'
import { Time } from './mypack-class'
import album from './assets/头像.jpg'

const App: React.FC<{
  song: string
  album: string
  totalSeconds: number
}> = prop => {
  const [currentSongSeconds, setSongSeconds] = useState(0)
  const addSecond = () => {
    setSongSeconds(currentSongSeconds + 1)
  }
  return (
    <div className="temp-grid-item">
      <div className="player-bar">
        <Image className="album-face" src={prop.album} />
        <ButtonGroup className="music-buttons">
          <Button className="last-track" Content="⏮" onClick={() => console.log(`I'm clicked 1`)} />
          <Button className="play-pause" Content="⏯" onClick={() => console.log(`I'm clicked 2`)} />
          <Button className="next-track" Content="⏭" onClick={() => console.log(`I'm clicked 3`)} />
        </ButtonGroup>
        <Timeline
          LeftLabel={<div className="songName">{prop.song}</div>}
          RightLabel={`${new Time(currentSongSeconds).print({ format: 'MM:ss' })} / ${
            prop.totalSeconds
          }`}
          initSecond={0}
          total={prop.totalSeconds}
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
