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

interface UserProfile {
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
  avatarUrl?: Url
  defaultAvatar?: false
  province?: number
  // experts?: {}
  expertTags?: null
  authStatus?: number
  mutual?: false
  remarkName?: null
  userId?: number
  detailDescription?: string
  backgroundUrl?: Url
  followed?: boolean
  signature?: string
  authority?: number
  followeds?: number
  follows?: number
  eventCount?: number
  playlistCount?: number
  playlistBeSubscribedCount?: number
}
interface UserAccount {
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
/**歌手 */
interface Artist {
  /**歌手ID */
  id: ID
  /**歌手名字 */
  name: string
}

/**TODO 这个接口定义没准这个是Song，而不是TopSong？ */
interface TopSong {
  /**乐曲的名称 */
  name: string
  /**乐曲ID */
  id: ID
  /**mvID，0代表不存在mv */
  mvid: ID
  /**专辑 */
  album: {
    /**专辑封面 */
    blurPicUrl: Url
  }
  /**歌手 */
  artists: Artist[]
  /**音轨信息 */
  privilege: {
    /**音质 */
    maxbr: number
  }
}

/** MV（表） */
interface MVBrief {
  /**mv ID */
  id: ID
  /**涉及到的歌手 */
  artists: Artist[]
  /**推荐理由 */
  copywriter: string
  /**mv名 */
  name: string
  /**mv封面 */
  picUrl: Url
  /**mv播放量 */
  playCount: number
}

/** MV（表） */
interface MVBrief2 {
  /**mv ID */
  id: ID
  /**涉及到的歌手 */
  artists: Artist[]
  /**推荐理由 */
  copywriter?: Scentence
  /**简单介绍 */
  briefDesc?: Scentence
  /**mv名 */
  name: string
  /**mv封面 */
  cover: Url
  /**mv播放量 */
  playCount: number
}

/**电台简介信息(排行榜) */
interface DJRank {
  /**电台ID */
  id: ID // 792868378
  /**电台名称 */
  name: string //'一条小团团OvO的翻唱合集'
  /**封面 */
  picUrl: Url //'http://p3.music.126.net/iRkVEquf5YAkzIILGyM_lg==/109951163905919405.jpg'
  /**所处分类 */
  category: string //'创作|翻唱'
  /**分类的ID */
  categoryId: ID // 2001
  /**创作时间 */
  createTime: number // 1551785967125
  /**创作人 */
  creatorName: Name // '一条小团团OvO'
  /**上次排行, -1 代表是新人 */
  lastRank: number //3
  programCount: 0
  radioFeeType: 0
  /**排行 */
  rank: number //2
  rcmdtext: string //'可神经可温柔的宝藏女声'
  /**成绩 */
  score: number //116563
  /**订阅数 */
  subCount: number //550587
}

/**电台简介信息 */
interface DJItem {
  /**电台ID */
  id: 34
  /**电台名称 */
  name: Name
  /**封面 */
  picUrl: Url
  /**最近一期的节目的名称 */
  lastProgramName: Name
  /**付费价格 */
  // originalPrice: null
  /**电台节目数 */
  programCount: number
  /**付费类型 */
  // radioFeeType: 0
  /**推荐理由 */
  rcmdText: Scentence
  /**是否以订阅 */
  subed: boolean
}

/** mv 详情（没有视频地址） */
interface MvDetail {
  id: ID
  /**名字，例如：'《今日营业中》黄龄：做NICE(耐撕)的姐姐' */
  name: Scentence
  /**封面 */
  cover: Url
  artistId: ID
  artistName: Name
  /**简介 */
  desc: Scentence
  coverId: ID
  playCount: number
  subCount: number
  shareCount: number
  commentCount: number
  duration: TimeNumber
  publishTime: DateString
  /**清晰度 */
  // brs: [
  //   { size: 34831384; br: 240; point: 0 },
  //   { size: 55557848; br: 480; point: 2 },
  //   { size: 86622680; br: 720; point: 5 },
  //   { size: 228604288; br: 1080; point: 10 }
  // ]
  artists: Artist[]
  /**评论列表 */
  commentThreadId: ID
}

interface MvUrl {
  url: Url
}
