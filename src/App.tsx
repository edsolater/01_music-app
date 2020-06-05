import React, { useEffect, useContext } from 'react'
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
import requestLikelist from 'requests/likelist'
import { storage } from './accessLocalStorage'
import LikelistProvider, { LikelistContext } from 'appContext/likelist'
import SongInfoProvider from 'appContext/SongInfo'
import PlaylistIdProvider from 'appContext/playlistId'

/**<App> */
function App() {
  const [, likelistDispatch] = useContext(LikelistContext)
  // FIXME - 似乎过段时间登录信息就会失效，不会带入cookie，导致301错误
  useEffect(() => {
    requestLogin({ phone: 18116311669, password: 'Zhgy0330#' }).then(({ data }) => {
      storage.account(data.account)
      storage.profile(data.profile)
      storage.token(data.token)
      requestLikelist({ uid: storage.account().id }).then(({ data }) => {
        likelistDispatch({ type: 'set', newLikelist: data.ids })
      })
    })
  }, [])
  return (
    <Provider store={store}>
      <Playlist />
      <DetailArea />
      <PlayerBar />
    </Provider>
  )
}
render(
  <LikelistProvider>
    <PlaylistIdProvider>
      <SongInfoProvider>
        <App />
      </SongInfoProvider>
    </PlaylistIdProvider>
  </LikelistProvider>,
  document.getElementById('app')
)
