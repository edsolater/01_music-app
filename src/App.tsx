import React, { FC, useEffect, useContext, createContext, useState, useMemo } from 'react'
import { render } from 'react-dom'

import 'assets/iconfont/iconfont.css'
import './App.scss'
import './initPackage'
import { Playlist, DetailArea, PlayerBar } from 'application'
import requestLogin from 'requests/login'
import useLocalStorage from 'hooks/useLocalStorage'
import requestLikelist from 'requests/likelist'

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

/* ------------------------------ 记录全局状态的 Context ----------------------------- */

const initContextState = {
  playlistId: NaN,
}
const AppContext = createContext({
  ...initContextState,
  setState: (() => {}) as React.Dispatch<React.SetStateAction<typeof initContextState>>,
})
export const useGlobalState = () => useContext(AppContext)

/* --------------------------------- 导出APP组件 -------------------------------- */

/**<App> */
const App: FC<{}> = () => {
  // 储存登录数据
  const [localStorage, setLocalStorage] = useLocalStorage()
  useEffect(() => {
    if (!localStorage.account.id) {
      requestLogin({ phone: 18116311669, password: 'Zhgy0330#' })
        .then(({ data }) => {
          setLocalStorage('account', data.account)
          setLocalStorage('profile', data.profile)
          setLocalStorage('token', data.token)
        })
        .then(() => {
          requestLikelist({ uid: localStorage.account.id }).then(({ data }) => {
            console.log('data: ', data) //TODO - 要想判定收藏的歌曲ID，肯定又要使用localStorage，于是必须完善useLocalStorage的逻辑
          })
        })
    }
  }, [])
  requestLikelist({ uid: localStorage.account.id }).then(({ data }) => {
    console.log('data: ', data) //TODO - 要想判定收藏的歌曲ID，肯定又要使用localStorage，于是必须完善useLocalStorage的逻辑
  }) // TODO

  //全局状态
  const [currentContextState, setCurrentContextState] = useState(initContextState)
  const currentContextStateWithSetter = useMemo(
    () => ({
      ...currentContextState,
      setState: setCurrentContextState,
    }),
    [currentContextState],
  )

  return (
    <AppContext.Provider value={currentContextStateWithSetter}>
      <Playlist />
      <DetailArea />
      <PlayerBar />
    </AppContext.Provider>
  )
}
render(<App />, document.getElementById('app'))
