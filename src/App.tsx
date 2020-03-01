import React, { useState, useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import './iconfont/iconfont.css'
import './App.scss'
import { AlbumMenu, MainAppContent, AudioPlayer } from 'components'
import { AppRoot } from 'mypack/basic_components'
import { appStore, loadDispatcher } from 'appStore'

//导入context
export const AppDataContext = React.createContext(appStore)
AppDataContext.displayName = 'AppData'

function App() {
  const [store, storeDispatcher] = useState(appStore)
  useEffect(() => {
    appStore
      .on('playNewMusic', (store, newMusic) => {
        console.log('first: ', 1)
      })
      .on('playNewMusic', (store, newMusic) => {
        console.log('second: ', 2)
      })
  }, [])
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
