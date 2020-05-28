import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'assets/iconfont/iconfont.css'
import './App.scss'
import './initPackage'
import { store } from 'redux/createStore'
import Playlist from 'application/Playlist'
import DetailArea from 'application/DetailArea'
import PlayerBar from 'application/Player'

/**<App> */
function App() {
  return (
    <Provider store={store}>
      <Playlist />
      <DetailArea />
      <PlayerBar />
    </Provider>
  )
}
render(<App />, document.getElementById('app'))
