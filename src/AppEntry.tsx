import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './AppEntry.css'

const App: React.FC = () => {
  return (
    <div className="temp-grid-item">
      <div className="player-bar">
        <div className="album-picture">hello</div>
        <div className="control-button-group">
          <div
            className="button last-track"
            onClick={() => {
              console.log(`I'm clicked 1`)
            }}
          >
            <div className="content">⏮</div>
          </div>
          <div
            className="button play-pause"
            onClick={() => {
              console.log(`I'm clicked 2`)
            }}
          >
            <div className="content">⏯</div>
          </div>
          <div
            className="button next-track"
            onClick={() => {
              console.log(`I'm clicked 3`)
            }}
          >
            <div className="content">⏭</div>
          </div>
        </div>
        <div className="music-progress-bar">longlong</div>
        <div className="other-buttons">a b c d</div>
      </div>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
