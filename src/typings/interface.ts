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
