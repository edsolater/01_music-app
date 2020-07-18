import React, { useEffect, useContext } from 'react'
import { render } from 'react-dom'

import 'assets/iconfont/iconfont.css'
import './App.scss'
import './initPackage'
import PlaylistMenu from 'application/PlaylistMenu'
import PlayerBar from 'application/PlayerBar'
import requestLogin from 'requests/login'
import requestLikelist from 'requests/likelist'
import { storage } from './api/localStorage'
import LikelistProvider, { LikelistContext } from 'context/likelist'
import SongInfoProvider from 'context/SongInfo'
import UserInfoProvider, { UserInfoContext } from 'context/UserInfo'
import DetailRouter from 'application/Details/DetailRouter'
import RouterProvider from 'context/router'

function App() {
  const [, likelistDispatch] = useContext(LikelistContext)
  const [, userInfoDispatch] = useContext(UserInfoContext)
  useEffect(() => {
    requestLogin({ phone: 18116311669, password: 'Zhgy0330#' }).then(({ data }) => {
      storage.account(data.account)
      storage.profile(data.profile)
      storage.token(data.token)
      userInfoDispatch({
        type: 'set by data',
        account: data.account,
        profile: data.profile,
        token: data.token
      })
      requestLikelist({ params: { uid: storage.account().id } })?.then(({ data }) => {
        likelistDispatch({ type: 'set by data', newLikelist: data.ids })
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
  <RouterProvider>
    <UserInfoProvider>
      <LikelistProvider>
        <SongInfoProvider>
          <App />
        </SongInfoProvider>
      </LikelistProvider>
    </UserInfoProvider>
  </RouterProvider>,
  document.getElementById('app')
)
