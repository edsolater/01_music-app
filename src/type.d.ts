/**
 * Menu中的Item信息
 */
declare type AlbumMenuItem = {
  imageUrl?: string
  title: string
  subtitle?: string
  detail?: string
  [otherInfo: string]: string | undefined
}

/**
 * Menu中的组别信息
 */
declare type AlbumMenuGroup = {
  title: string
  [otherInfo: string]: string | undefined
}

/**
 * 一首音乐所必须包含的信息
 */
declare type MusicInfo = {
  songTitle: string
  albumUrl: string
  soundtrackUrl: string
}

declare type ActionType = 'show-local-music' | 'show-downloaded-music' | 'show-recent-music'
