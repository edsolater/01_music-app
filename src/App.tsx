import React, { FC, useEffect } from 'react'
import { render } from 'react-dom'

import 'assets/iconfont/iconfont.css'
import './App.scss'
import './initPackage'
import { Playlist, MainAppContent, PlayerBar } from 'application'
import requestLogin from 'requests/login'
import useLocalStorage from 'hooks/useLocalStorage'

/* -------------------------------- 全局可用的一些变量（已包装成hooks） ------------------------------- */

const cache: {
  profile?: IProfile
  account?: IAccount
  token?: string
} = {}

const getter = {
  get profile(): IProfile {
    if (!cache.profile) cache.profile = JSON.parse(localStorage.getItem(`music_profile`) || '{}')
    return cache.profile!
  },
  get account(): IAccount {
    if (!cache.account) cache.account = JSON.parse(localStorage.getItem(`music_account`) || '{}')
    return cache.account!
  },
  get token(): string {
    if (!cache.token) cache.token = JSON.parse(localStorage.getItem(`music_token`) || '')
    return cache.token!
  },
}
export const useUserInfo = () => getter

/* --------------------------------- 导出APP组件 -------------------------------- */

/**<App> */
const App: FC<{}> = () => {
  const [localStorage, setLocalStorage] = useLocalStorage()
  useEffect(() => {
    if (!localStorage.account.id) {
      requestLogin({ phone: 18116311669, password: 'Zhgy0330#' }).then(({ data }) => {
        setLocalStorage('account', data.account)
        setLocalStorage('profile', data.profile)
        setLocalStorage('token', data.token)
      })
    }
  }, [])
  return (
    <>
      <Playlist />
      <MainAppContent />
      <PlayerBar />
    </>
  )
}
render(<App />, document.getElementById('app'))
