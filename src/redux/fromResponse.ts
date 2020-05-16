/**********
 *
 * 存放从后端返回的数据
 *
 **********/

export type IStore = {
  songInfo: MusicInfo
  likeList: ID[]
}
export type IAction =
  | {
      type: 'SET_SONG_INFO'
      songInfo: MusicInfo
    }
  | {
      type: 'SET_LIKELIST'
      likeList: ID[]
    }
export const reducer = (
  state = {
    songInfo: {},
    likeList: JSON.parse(window.localStorage.getItem(`music_likeList`) || '[]'),
  },
  action: IAction,
) => {
  switch (action.type) {
    case 'SET_SONG_INFO':
      return { ...state, songInfo: action.songInfo }
    case 'SET_LIKELIST':
      return action.likeList
    default:
      return state
  }
}
