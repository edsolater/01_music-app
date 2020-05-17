/**********
 *
 * 存放从后端返回的数据
 *
 **********/

import produce from 'immer'

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
export const reducer = produce(
  (draft: IStore, action: IAction) => {
    switch (action.type) {
      case 'SET_SONG_INFO':
        draft.songInfo = action.songInfo
        return
      case 'SET_LIKELIST':
        draft.likeList = action.likeList
        return
    }
  },
  {
    songInfo: {},
    likeList: JSON.parse(window.localStorage.getItem(`music_likeList`) || '[]'),
  },
)
