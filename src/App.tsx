import React, { useEffect, useContext } from 'react'
import { render } from 'react-dom'
import 'assets/iconfont/iconfont.css'
import './initPackage'
import './App.scss'

import fetch from 'api/fetch'
import PlaylistMenu from 'app/PlaylistMenu'
import PlayerBar from 'app/PlayerBar'
import { storage } from './api/localStorage'
import LikelistProvider, { LikelistContext } from 'app/context/likelist'
import SongInfoProvider from 'app/context/SongInfo'
import UserInfoProvider, { UserInfoContext } from 'app/context/UserInfo'
import DetailRouter from 'app/Details/DetailRouter'
import RouterProvider from 'app/context/router'

function App() {
  const [, likelistDispatch] = useContext(LikelistContext)
  const [, userInfoDispatch] = useContext(UserInfoContext)
  useEffect(() => {
    fetch('/login/cellphone', {
      phone: '18116311669',
      password: 'Zhgy0330#' /* 暂且写死在代码里 */
    })?.then(({ data }) => {
      userInfoDispatch({
        type: 'set from data',
        account: data.account,
        profile: data.profile,
        token: data.token
      })
      fetch('/likelist', { uid: storage.get('account')?.id ?? '' })?.then(res => {
        likelistDispatch({ type: 'set from data', newLikelist: res.data.ids })
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
