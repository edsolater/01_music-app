import React, { useEffect } from 'react'
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

/* ------------------ localStorage 储存 全局可用的一些变量（已包装成hooks） ------------------ */

// TODO - 这样直接的缓存，一旦有值，就不再使用localStorage的值了
interface ICache {
  profile: IProfile
  account: IAccount
  token: string
  likelist: ID[]
}

type WrapperToChangeProperties<O extends AnyObject> = {
  [T in keyof O]: { (data: O[T]): void; (): O[T] }
}

/**为了避免localhost下的localStorage命名冲突，故加入命名空间前缀 */
const prefix = 'music_'
const cache: ICache = { profile: {}, account: {}, token: '', likelist: [] }
const storage: WrapperToChangeProperties<ICache> = {
  //@ts-ignore
  profile(data?: IProfile) {
    if (data) {
      cache.profile = data
      JSON.stringify(window.localStorage.setItem(`${prefix}profile`, JSON.stringify(data)))
    } else {
      if (!cache.profile)
        cache.profile = JSON.parse(window.localStorage.getItem(`${prefix}profile`) || '{}')
      return cache.profile
    }
  },
  //@ts-ignore
  account(data?: IAccount) {
    if (data) {
      cache.account = data
      JSON.stringify(window.localStorage.setItem(`${prefix}account`, JSON.stringify(data)))
    } else {
      if (!cache.account)
        cache.account = JSON.parse(window.localStorage.getItem(`${prefix}account`) || '{}')
      return cache.account
    }
  },
  //@ts-ignore
  token(data?: string) {
    if (data) {
      cache.token = data
      JSON.stringify(window.localStorage.setItem(`${prefix}token`, JSON.stringify(data)))
    } else {
      if (!cache.token)
        cache.token = JSON.parse(window.localStorage.getItem(`${prefix}token`) || '""')
      return cache.token
    }
  },
  //@ts-ignore
  likelist(data?: ID[]) {
    if (data) {
      cache.likelist = data
      JSON.stringify(window.localStorage.setItem(`${prefix}likelist`, JSON.stringify(data)))
    } else {
      if (!cache.likelist)
        cache.likelist = JSON.parse(window.localStorage.getItem(`${prefix}likelist`) || '{}')
      return cache.likelist
    }
  }
}

/**<App> */
function App() {
  // FIXME - 似乎过段时间登录信息就会失效，不会带入cookie，导致301错误
  useEffect(() => {
    requestLogin({ phone: 18116311669, password: 'Zhgy0330#' }).then(({ data }) => {
      storage.account(data.account)
      storage.account(data.account)
      storage.profile(data.profile)
      storage.token(data.token)
      requestLikelist({ uid: storage.account().id }).then(({ data }) => {
        storage.likelist(data.ids)
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
render(<App />, document.getElementById('app'))
