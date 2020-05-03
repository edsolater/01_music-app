import React, { FC, useEffect } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'assets/iconfont/iconfont.css'
import './App.scss'
import './initPackage'
import { store } from 'redux/$createStore'
import { Playlist, MainAppContent, PlayerBar } from 'apps'
import requestLogin from 'requests/login'
import useLocalStorage from 'hooks/useLocalStorage'
import { useTypedDispatch } from 'redux/$createReducer'

/**<App> */
const App: FC<{}> = () => {
  const [localStorage, setLocalStorage] = useLocalStorage()
  const dispatch = useTypedDispatch()
  useEffect(() => {
    if (!localStorage.account.id) {
      requestLogin({ phone: 18116311669, password: 'Zhgy0330#' }).then(({ data }) => {
        setLocalStorage('account', data.account)
        setLocalStorage('profile', data.profile)
        setLocalStorage('token', data.token)
        dispatch({
          type: 'UPDATE_LOGIN_INFO',
          data: { profile: data.profile, account: data.account, token: data.token },
        })
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
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)
