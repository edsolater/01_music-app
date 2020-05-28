import React, { useEffect } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'assets/iconfont/iconfont.css'
import './App.scss'
import './initPackage'
import { store } from 'redux/createStore'
import Playlist from 'application/Playlist'
import DetailArea from 'application/DetailArea'
import PlayerBar from 'application/Player'
import requestLogin from 'requests/login'

/**<App> */
function App() {
  // FIXME - 似乎过段时间登录信息就会失效，不会带入cookie，导致301错误
  // useEffect(() => {
  //     requestLogin({ phone: 18116311669, password: 'Zhgy0330#' })
  // }, [])
  return (
    <Provider store={store}>
      <Playlist />
      <DetailArea />
      <PlayerBar />
    </Provider>
  )
}
render(<App />, document.getElementById('app'))
