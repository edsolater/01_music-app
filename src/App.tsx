import React, { FC } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'assets/iconfont/iconfont.css'
import './App.scss'
import './initPackage'
import { store } from 'stores/createStore'
import { AlbumMenu, MainAppContent, AudioPlayer } from 'apps'
import requestLogin from 'requests/login'
import requestUserPlaylist from 'requests/user/playlist'

/**<App> */
const App: FC<{}> = () => (
  <Provider store={store}>
    <AlbumMenu />
    <MainAppContent />
    <AudioPlayer />
  </Provider>
)
// requestLogin({ phone: 18116311669, password: 'Zhgy0330#' }).then((res) =>
//   requestUserPlaylist({ uid: res.data.account.id }).then(console.log),
// )
render(<App />, document.getElementById('app'))
