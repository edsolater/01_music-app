import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './AppEntry.css'
import { Button, ButtonGroup } from './mypack_components'

const App: React.FC = () => {
  return (
    <div className="temp-grid-item">
      <div className="player-bar">
        <div className="album-picture">helsslo</div>
        <ButtonGroup className="soundtrack">
          <Button className="last-track" Content="⏮" onClick={() => console.log(`I'm clicked 1`)}>hhh</Button>
          <Button className="play-pause" Content="⏯" onClick={() => console.log(`I'm clicked 2`)} />
          <Button className="next-track" Content="⏭" onClick={() => console.log(`I'm clicked 3`)} />
        </ButtonGroup>
        <div className="music-progress-bar">longlong</div>
        <div className="other-buttons">a b c d</div>
      </div>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
