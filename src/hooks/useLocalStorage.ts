/**为了避免localhost下的localStorage命名冲突，故加入命名空间前缀 */
const prefix = 'music_'

/** 因为每次都要重新访问localStorage对性能不友好，所以需要缓存 */
const cache: {
  profile?: IProfile
  account?: IAccount
  token?: string
} = {}

/** 每次都返回同一个实例,所以定义在hooks外面就好了 */
const getter = {
  get profile(): IProfile {
    return cache.profile ?? JSON.parse(localStorage.getItem(`${prefix}profile`) || '{}')
  },
  get account(): IAccount {
    return cache.account ?? JSON.parse(localStorage.getItem(`${prefix}account`) || '{}')
  },
  get token(): string {
    return cache.token ?? JSON.parse(localStorage.getItem(`${prefix}token`) || '')
  },
}
const setter: {
  (key: 'profile', value: IProfile): void
  (key: 'account', value: IAccount): void
  (key: 'token', value: string): void
} = (key: 'profile' | 'account' | 'token', value: IProfile | IAccount | string) => {
  switch (key) {
    case 'profile':
      cache.profile = value as IProfile
      return window.localStorage.setItem(`${prefix}profile`, JSON.stringify(value))
    case 'account':
      cache.account = value as IAccount
      return window.localStorage.setItem(`${prefix}account`, JSON.stringify(value))
    case 'token':
      cache.token = value as string
      return window.localStorage.setItem(`${prefix}token`, JSON.stringify(value))
  }
}

const useLocalStorage = () => [getter, setter] as const
export default useLocalStorage
