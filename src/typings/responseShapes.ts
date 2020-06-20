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

type MusicInfoInList = Partial<{
  name: string
  id: number
  pst: number
  t: number
  ar: [
    {
      id: number
      name: string
      tns: []
      alias: []
    },
    {
      id: number
      name: string
      tns: []
      alias: []
    }
  ]
  alia: []
  pop: number
  st: number
  rt: number
  fee: number
  v: string
  cf: string
  al: {
    id: number
    name: string
    picUrl: string
    tns: any[]
    pic: number
  }
  dt: number
  h: {
    br: number
    fid: number
    size: number
    vd: number
  }
  m: {
    br: number
    fid: number
    size: number
    vd: number
  }
  l: {
    br: number
    fid: number
    size: number
    vd: number
  }
  a: null
  cd: string
  no: number
  rtUrl: null
  ftype: number
  rtUrls: []
  djId: number
  copyright: number
  s_id: number
  mark: number
  originCoverType: number
  noCopyrightRcmd: null
  mst: number
  cp: number
  mv: number
  rtype: number
  rurl: null
  publishTime: number
}>
type MusicInfoInUrl = Partial<{
  id: number
  url: string
  br: number
  size: number
  md5: string
  code: HttpCode
  expi: number
  type: string
  gain: number
  fee: number
  uf: null
  payed: number
  flag: number
  canExtend: boolean
  freeTrialInfo: null
  level: string
  encodeType: string
}>
type MusicInfo = MusicInfoInList & MusicInfoInUrl

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
  authStatus?: number
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
  ban?: number
  baoyueVersion?: number
  donateVersion?: number
  vipType?: number //vip类型
  viptypeVersion?: number //此vip的版本
  anonimousUser?: boolean //是否是匿名用户
}
interface Banner {
  imageUrl: Url
  url: Url // 表示点击后的跳转链接
}
interface RecommendResource {
  id: ID // 歌单Id
  copywriter: string // 推荐理由，例：根据你喜欢的单曲《ロストワンの号哭》推荐
  name: string // legend 话术 例：私人雷达|根据听歌记录为你打造
  picUrl: Url // 显示的封面图片
  playcount: number // 播放量
}
interface ExclusiveContent {
  id: ID // mvId
  name: string // legend 话术 例：《今日营业中》霸占云村热搜的男人keshi
  sPicUrl: Url // 显示的封面图片
}
