import React, { useEffect, useContext } from 'react'
import { render } from 'react-dom'

import 'assets/iconfont/iconfont.css'
import './App.scss'
import './initPackage'
import PlaylistMenu from 'application/PlaylistMenu'
import PlayerBar from 'application/PlayerBar'
import requestLogin from 'requests/login'
import requestLikelist from 'requests/likelist'
import { storage } from './utils/localStorage'
import LikelistProvider, { LikelistContext } from 'appContext/likelist'
import SongInfoProvider from 'appContext/SongInfo'
import PlaylistIdProvider from 'appContext/playlistId'
import UserInfoProvider, { UserInfoContext } from 'appContext/UserInfo'
import DetailRouter from 'application/Details/DetailRouter'

function App() {
  const [, likelistDispatch] = useContext(LikelistContext)
  const [, userInfoDispatch] = useContext(UserInfoContext)
  useEffect(() => {
    requestLogin({ phone: 18116311669, password: 'Zhgy0330#' }).then(({ data }) => {
      storage.account(data.account)
      storage.profile(data.profile)
      storage.token(data.token)
      userInfoDispatch({
        type: 'set',
        account: data.account,
        profile: data.profile,
        token: data.token
      })
      requestLikelist({ params: { uid: storage.account().id } })?.then(({ data }) => {
        likelistDispatch({ type: 'set', newLikelist: data.ids })
      })
    })
  }, [])
  return (
    <>
      <PlaylistMenu />
      <DetailRouter />
      <PlayerBar />
    </>
  )
}
render(
  <UserInfoProvider>
    <LikelistProvider>
      <PlaylistIdProvider>
        <SongInfoProvider>
          <App />
        </SongInfoProvider>
      </PlaylistIdProvider>
    </LikelistProvider>
  </UserInfoProvider>,
  document.getElementById('app')
)
