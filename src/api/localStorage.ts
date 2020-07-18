/* ------------------ localStorage 储存 全局可用的一些变量（已包装成hooks） ------------------ */
// TODO - 这样直接的缓存，一旦有值，就不再使用localStorage的值了
interface ICache {
  profile: UserProfile
  account: UserAccount
  token: string
  likelist: ID[]
}
/**为了避免localhost下的localStorage命名冲突，故加入命名空间前缀 */
const prefix = 'music_'
const cache: Partial<ICache> = {}
export const storage = {
  get<K extends keyof ICache>(key: K): ICache[K] | undefined {
    if (cache[key]) {
      return cache[key] as ICache[K]
    } else {
      const dataInLocalStorage = window.localStorage.getItem(`${prefix}${key}`)
      if (dataInLocalStorage) {
        cache[key] = JSON.parse(dataInLocalStorage)
        return cache[key] as ICache[K]
      } else {
        return undefined
      }
    }
  },
  set<K extends keyof ICache>(key: K, data: ICache[K] | undefined): void {
    if (data === undefined) return
    cache[key] = data
    JSON.stringify(window.localStorage.setItem(`${prefix}profile`, JSON.stringify(data)))
  }
}
