import React from 'react'
import * as ReactDOM from 'react-dom'

import './AppEntry.css'

import albumUrl from './assets/头像.png'
import soundtrackUrl from './assets/ezio Family.mp3'
import { PlayerBar } from './components/PlayerBar'

const App: React.FC<{}> = props => (
  <div className="app-box">
    <div className="content-space" />
    <PlayerBar
      {...{
        songTitle: 'words-Aimer',
        albumUrl: albumUrl,
      }}
      soundtrackUrl={soundtrackUrl}
    />
  </div>
)
ReactDOM.render(<App />, document.getElementById('root'))
