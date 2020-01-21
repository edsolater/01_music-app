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
interface MenuGroupData { [groupPathLabel: string]: AlbumMenuItem[] }

/**
 * 一首音乐所必须包含的信息
 */
interface MusicInfo  {
  songTitle: string
  albumUrl: string
  soundtrackUrl: string
}
/** 图片url */
type PicUrl = string

/**
 * 登录的账号信息
 */
interface UserInfo {
  avatar: PicUrl
  nickname: string  
}