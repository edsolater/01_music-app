import React from 'react'
import * as ReactDOM from 'react-dom'

import './App.scss'

import { AppRoot } from 'mypack/basic_components'
import AudioPlayer from 'components/AudioPlayer'
import AlbumMenu from 'components/AlbumMenu'
import MainAppContent from 'components/MainAppContent'
import { initAppData } from './store'

export const AppDataContext = React.createContext(initAppData)
AppDataContext.displayName = 'AppData'

function App() {
  return (
    <AppRoot>
      <React.StrictMode>
        <AppDataContext.Provider value={initAppData}>
          <AlbumMenu />
          <MainAppContent />
          <AudioPlayer />
        </AppDataContext.Provider>
      </React.StrictMode>
    </AppRoot>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
