/**
 * 点击某个菜单项能dispatch的事件介绍
 */
declare type ActionType = 'show-local-music' | 'show-downloaded-music' | 'show-recent-music'

/**
 * Menu中的Item信息
 */
interface AlbumMenuItem {
  [itemInfo: string]: string | undefined
  imageUrl?: string
  itemPathLabel: string
  subtitle?: string
  detail?: string
  selectAction?: ActionType
}

/**
 * Menu中的组别信息
 */
interface AlbumMenuGroup {
  title: string
  [otherInfo: string]: string | undefined
}
/**
 * 需要传递给<Menu>组件（带Group的数据形式）
 */
interface MenuGroupData {
  [groupPathLabel: string]: AlbumMenuItem[]
}

/**
 * 一首音乐所必须包含的信息
 */
interface MusicInfo {
  /**乐曲名称 */
  songTitle: string
  /**专辑封面的URL */
  albumUrl?: PicUrl
  /**音频文件的URL */
  soundtrackUrl: string
  /**歌曲的总长度 */
  totalLength?: number
}

/** 图片url */
type PicUrl = string

/**
 * 承载整个应用的所有数据结构
 */
interface DataSchema {
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
    volumn: 1
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
      [groupName: string]: AlbumMenuItem[]
    }
  }

  /**
   * 实际内容相关
   */
  musicList?: MusicInfo[]

  /**播放另一首歌曲 */
  playNewMusic(newMusic: MusicInfo): DataSchema
  /**载入新播放列表 */
  loadNewMusicList(newMusicList: MusicInfo[]): DataSchema
  /**切换播放模式 */
  switchPlayMode(): DataSchema
  /**设定新音量 */
  setVolumn(newVolumn: number /* 0-1 */): DataSchema
  /**新增一个音乐集 */
  createNewMusicCollection(): DataSchema
}
