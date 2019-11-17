import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './AppEntry.css'
import { Button, ButtonGroup } from './mypack_components'
import album from './assets/头像.jpg'
import { Image } from './mypack_components'

const App: React.FC = () => {
  return (
    <div className="temp-grid-item">
      <div className="player-bar">
        <Image className="album-face" src={album}></Image>
        <ButtonGroup className="music-buttons">
          <Button className="last-track" Content="⏮" onClick={() => console.log(`I'm clicked 1`)} />
          <Button className="play-pause" Content="⏯" onClick={() => console.log(`I'm clicked 2`)} />
          <Button className="next-track" Content="⏭" onClick={() => console.log(`I'm clicked 3`)} />
        </ButtonGroup>
        <div className="music-timeline">longlong</div>
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
ReactDOM.render(<App />, document.getElementById('root'))
