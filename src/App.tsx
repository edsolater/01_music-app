import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'assets/iconfont/iconfont.css'
import './App.scss'
import './initPackage'
import { Playlist, DetailArea, PlayerBar } from 'application'
import { store } from 'redux/createStore'

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
