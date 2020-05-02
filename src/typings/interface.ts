type ActionType = 'show-local-disk-music' | 'show-downloaded-music' | 'show-recent-music'

type PicUrl = string
type CallbackFunction = (...anys: any[]) => any
type Percent = number

interface CollectionItemInfo {
  label: string
  subtitle?: string
  icon?: IconfontName
  hasSomethingNew?: boolean
  detail?: {
    imageUrl?: string
    selectAction?: ActionType
  }
}
/**
 * 一首音乐所必须包含的信息
 */
interface MusicInfo {
  /**歌曲名称 */
  songName: string
  /**歌曲副标题 */
  songSubname?: string
  /**专辑封面的URL */
  albumUrl?: PicUrl
  /**音频文件的URL */
  soundtrackUrl?: string
  /**歌曲的总长度 */
  totalSeconds: number
  /**所属专辑的名称 */
  albumName?: string
  /**是否已加入 “我喜欢” */
  isLiked?: boolean
  /**这首歌的作者 */
  author: string
  /**是否是高清版本的音源 */
  isSQ?: boolean
  /**是否有相关MV */
}

interface IProfile {
  description?: string
  vipType?: number
  gender?: number
  accountStatus?: number
  avatarImgId?: number
  nickname?: string
  birthday?: number
  city?: number
  djStatus?: number
  userType?: number
  backgroundImgId?: number
  avatarUrl?: PicURL
  defaultAvatar?: false
  province?: number
  // experts?: {}
  expertTags?: null
  authStatus?: 0
  mutual?: false
  remarkName?: null
  userId?: number
  detailDescription?: string
  backgroundUrl?: PicURL
  followed?: boolean
  signature?: string
  authority?: number
  followeds?: number
  follows?: number
  eventCount?: number
  playlistCount?: number
  playlistBeSubscribedCount?: number
}
interface IAccount {
  id?: ID // 账号ID
  userName?: string // 账号名（非昵称）
  type?: number // 账号类型
  status?: number // 账号状态
  whitelistAuthority?: number //是否是白名单用户
  createTime?: number //账号创建时间
  salt?: string //？随机值？
  tokenVersion?: 1 // token的类型
  ban?: 0
  baoyueVersion?: 0
  donateVersion?: 0
  vipType?: number //vip类型
  viptypeVersion?: number //此vip的版本
  anonimousUser?: boolean //是否是匿名用户
}
