import React, { useState } from 'react'
import * as ReactDOM from 'react-dom'

import './App.scss'

import { AppRoot } from 'mypack/basic_components'
import { appStore, loadDispatcher } from 'appStore'
import { AlbumMenu, MainAppContent, AudioPlayer } from 'components'

export const AppDataContext = React.createContext(appStore)
AppDataContext.displayName = 'AppData'

function App() {
  const [store, storeDispatcher] = useState(
    appStore
      .on('playNewMusic', (newMusic) => {
        console.log('first: ', 1)
      })
      .on('playNewMusic', (newMusic) => {
        console.log('second: ', 2)
      }),
  )
  loadDispatcher(storeDispatcher)
  return (
    <AppRoot>
      <React.StrictMode>
        <AppDataContext.Provider value={store}>
          <AlbumMenu />
          <MainAppContent />
          <AudioPlayer />
        </AppDataContext.Provider>
      </React.StrictMode>
    </AppRoot>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
