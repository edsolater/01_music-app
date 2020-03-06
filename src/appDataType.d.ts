/**
 * 点击某个菜单项能dispatch的事件介绍
 */
declare type ActionType = 'show-local-music' | 'show-downloaded-music' | 'show-recent-music'

interface CollectionItemInfo {
  title: string
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
  totalSeconds?: number
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

/** 图片url */
type PicUrl = string
type CallbackFunction = (...anys: any[]) => any
type Percent = number

type AppStore = DataStore & DataDispatchers & DataCallbackAdder
/**
 * 承载整个应用的所有数据结构
 */
interface DataStore {
  /**
   * 用户信息
   */
  userProfile: {
    avatar: PicUrl
    nickname: string
    messageList: any[]
  }

  /**
   * 播放器相关
   */
  playerBar: {
    currentMusicInfo?: MusicInfo
    /**音量大小 */
    volumn: Percent
    /**播放模式 */
    mode: '单曲循环' | '列表循环' | '随机选取'
    /**播放列表 */
    musicList: MusicInfo[]
  }

  /**
   * 菜单列表相关
   */
  menu: {
    initIndex: number
    collections: {
      [groupName: string]: CollectionItemInfo[]
    }
  }

  collectionInfo: {
    title: string
    creatorInfo: {
      avatar: PicUrl
      nickName: string
    }
    thumbnail: PicUrl
    createTime: string
  }
  /**
   * 实际内容相关
   */
  collectionMusicList: MusicInfo[]
}
/**
 * 承载整个应用的所有交互方法
 */
interface DataDispatchers {
  /**播放另一首歌曲 */
  playNewMusic(newMusic: MusicInfo): AppStore
  /**载入新播放列表 */
  loadNewMusicList(newMusicList: MusicInfo[]): AppStore
  /**切换播放模式 */
  switchPlayMode(): AppStore
  /**设定新音量 */
  setVolumn(newVolumn: number /* 0-1 */): AppStore
  /**新增一个音乐集 */
  createNewMusicCollection(): AppStore
  getAllstore(): Promise<any>
}

interface DataCallbackAdder {
  on<Name extends keyof DataDispatchers>(
    dispatcherName: Name,
    callbackFunction: (store: AppStore, ...params: Parameters<DataDispatchers[Name]>) => any,
  ): AppStore
  off<Name extends keyof DataDispatchers>(
    dispatcherName: Name,
    callbackFunction: (store: AppStore, ...params: Parameters<DataDispatchers[Name]>) => any,
  ): AppStore
}

type DataCallbackPool = {
  [T in keyof DataDispatchers]?: CallbackFunction[]
}
