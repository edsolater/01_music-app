import React, { FC } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import './assets/iconfont/iconfont.css'
import './App.scss'
import { AlbumMenu, MainAppContent, AudioPlayer } from 'components'
import { store } from './store'

/**<App> */
const App: FC<{}> = () => (
  <Provider store={store}>
    <AlbumMenu />
    <MainAppContent />
    <AudioPlayer />
  </Provider>
)

render(<App />, document.getElementById('app'))
