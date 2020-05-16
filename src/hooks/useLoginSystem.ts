import { useEffect } from 'react'
import requestLogin from 'requests/login'
import { setToLocalStorage } from 'utils/web/localStorage'
import requestLikelist from 'requests/likelist'

/**为了避免localhost下的localStorage命名冲突，故加入命名空间前缀 */
const prefix = 'music_'

// TODO - 这样直接的缓存，一旦有值，就不再使用localStorage的值了
const cache: {
  profile?: IProfile
  account?: IAccount
  token?: string
  likeList?: ID[]
} = {}

const getter = {
  get profile() {
    if (!cache.profile)
      cache.profile = JSON.parse(window.localStorage.getItem(`${prefix}profile`) || '""')
    return cache.profile
  },
  get account() {
    if (!cache.account)
      cache.account = JSON.parse(window.localStorage.getItem(`${prefix}account`) || '{}')
    return cache.account
  },
  get token() {
    if (!cache.token)
      cache.token = JSON.parse(window.localStorage.getItem(`${prefix}token`) || '""')
    return cache.token
  },
  get likeList() {
    if (!cache.likeList)
      cache.likeList = JSON.parse(window.localStorage.getItem(`${prefix}likeList`) || '[]')
    return cache.likeList
  },
}
export const getUserInfo = () => getter

// 储存登录数据
useEffect(() => {
  // TODO 需要有个机制在请求失败时自动登录
  if (!getter.account?.id) {
    requestLogin({ phone: 18116311669, password: 'Zhgy0330#' })
      .then(({ data = {} }) => {
        setToLocalStorage(`${prefix}account`, JSON.stringify(data.account))
        setToLocalStorage(`${prefix}profile`, JSON.stringify(data.profile))
        setToLocalStorage(`${prefix}token`, JSON.stringify(data.token))
      })
      .then(() => {
        requestLikelist({ uid: getter.account?.id }).then(({ data = {} }) => {
          setToLocalStorage(`${prefix}likeList`, JSON.stringify(data.ids))
        })
      })
  }
}, [])
