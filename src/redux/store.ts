import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { createStore } from 'redux'
import { Dispatch } from 'react'

/* --------------------------------- reducer -------------------------------- */

type IAction =
  | {
      type: 'UPDATE_PLAYLIST_ID'
      playlistId: ID
    }
  | {
      type: 'ADD_SONG_INFO'
      songInfo: MusicInfo
    }
const rootReducer = (
  state = {
    /* 这里就是初始化state */
  },
  action: IAction,
) => {
  switch (action.type) {
    case 'ADD_SONG_INFO':
      return { ...state, songInfo: action.songInfo }
    case 'UPDATE_PLAYLIST_ID':
      //TODO - 需要使用immer，简化掉...state
      return { ...state, playlistId: action.playlistId }
    default:
      return state
  }
}
export const useTypedDispatch = (): Dispatch<IAction> => useDispatch()

/**store */
const initStore = {
  userProfile: {} as IProfile,
  playlistId: NaN,
  songInfo: {} as MusicInfo,
}
export const store = createStore(rootReducer, initStore)
export const useTypedSelector: TypedUseSelectorHook<typeof initStore> = useSelector
