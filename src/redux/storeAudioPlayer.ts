import avatar from 'assets/头像.jpg' // 这个信息最终要靠后端传过来，现在只是占位
import soundtrackUrl from 'assets/ezio Family.mp3' // 这个信息最终要靠后端传过来，现在只是占位

// 暴露给顶层store
const audioPlayerData = {
  currentMusicInfo: {
    isLiked: true,
    songName: `ezio Family.mp3`,
    songSubname: '(游戏《刺客信条》配乐)',
    author: 'Jesper Kyd',
    albumName: "Assassin's Creed 2 (Original Game Soundtrack)（刺客信条2 原声大碟）",
    totalSeconds: 144,
    albumUrl: avatar,
    soundtrackUrl: soundtrackUrl,
    isSQ: true,
  },
  /**音量大小 */
  volumn: 1,
  /**播放模式 */
  mode: '列表循环' as '单曲循环' | '列表循环' | '随机选取',
  /**播放列表 */
  musicList: [],
}
export default audioPlayerData
