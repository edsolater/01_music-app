/* ------------------ localStorage 储存 全局可用的一些变量（已包装成hooks） ------------------ */
// TODO - 这样直接的缓存，一旦有值，就不再使用localStorage的值了
interface ICache {
  profile: IProfile
  account: IAccount
  token: string
  likelist: ID[]
}
type GetWithSet<O extends AnyObject> = {
  [T in keyof O]: {
    (data: O[T]): void
    (): O[T]
  }
}
/**为了避免localhost下的localStorage命名冲突，故加入命名空间前缀 */
const prefix = 'music_'
const cache: ICache = { profile: {}, account: {}, token: '', likelist: [] }
export const storage: GetWithSet<ICache> = {
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
