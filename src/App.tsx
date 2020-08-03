import React, { useEffect, useContext } from 'react'
import { render } from 'react-dom'
import 'assets/iconfont/iconfont.css'
import './initPackage'
import './utils/style_init_default.scss' // 针对浏览器默认样式
import './utils/style_shortcut.scss' // 快捷方式类
import './utils/style_status.scss' // 基本状态类们
import './App.scss'

import { AllResponse } from 'typings/requestPath'
import PlaylistMenu from 'app/PlaylistMenu'
import PlayerBar from 'app/PlayerBar'
import { storage } from './api/localStorage'
import LikelistProvider, { LikelistContext } from 'context/likelist'
import SongInfoProvider from 'context/SongInfo'
import UserInfoProvider, { UserInfoContext } from 'context/UserInfo'
import DetailRouter from 'app/Details/DetailRouter'
import RouterProvider from 'context/router'
import { myFetch } from 'hooks/useFetch'

function App() {
  const [, likelistDispatch] = useContext(LikelistContext)
  const [, userInfoDispatch] = useContext(UserInfoContext)
  useEffect(() => {
    myFetch<AllResponse['/login/cellphone']>('/login/cellphone', {
      phone: '18116311669',
      password: 'Zhgy0330#' /* 暂且写死在代码里， 以后要换成输入的state */
    }).then(data => {
      userInfoDispatch({
        type: 'set from data',
        account: data.account,
        profile: data.profile,
        token: data.token
      })
      myFetch<AllResponse['/likelist']>('/likelist', {
        uid: storage.get('account')?.id ?? ''
      }).then(res => {
        likelistDispatch({ type: 'set from data', newLikelist: res.ids })
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
