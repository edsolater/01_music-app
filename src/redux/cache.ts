/**********
 *
 * 存放从后端返回的数据
 *
 **********/

import produce from 'immer'

export type IStore = {
  songInfo: MusicInfo
  likelist: ID[]
}
export type IAction =
  | {
      type: 'SET_SONG_INFO'
      songInfo: MusicInfo
    }
  | {
      type: 'SET_LIKELIST'
      likelist: ID[]
    }
export const reducer = produce(
  (draft: IStore, action: IAction) => {
    switch (action.type) {
      case 'SET_SONG_INFO':
        draft.songInfo = action.songInfo
        return
      case 'SET_LIKELIST':
        draft.likelist = action.likelist
        return
    }
  },
  {
    songInfo: {},
    likelist: JSON.parse(window.localStorage.getItem(`music_likelist`) || '[]')
  }
)
