import React, { FC, useEffect } from 'react'
import { render } from 'react-dom'

import 'assets/iconfont/iconfont.css'
import './App.scss'
import './initPackage'
import { Playlist, MainAppContent, PlayerBar } from 'apps'
import requestLogin from 'requests/login'
import useLocalStorage from 'hooks/useLocalStorage'

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
