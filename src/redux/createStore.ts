import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { Dispatch } from 'react'

import {
  reducer as logininfoReducer,
  IStore as LoginInfoStore,
  IAction as LoginInfoAction,
} from './loginInfo'
import {
  reducer as likeListReducer,
  IStore as LikeListStore,
  IAction as LikeListAction,
} from './likeList'

/* --------------------------------- reducer -------------------------------- */
type IStore = {
  userProfile: IProfile
  playlistId: ID
  songInfo: MusicInfo
}
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
    userProfile: {} as IProfile,
    playlistId: NaN as ID,
    songInfo: {} as MusicInfo,
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
export const useTypedDispatch: () => Dispatch<
  IAction | LoginInfoAction | LikeListAction
> = useDispatch

/**store */
export const store = createStore(
  combineReducers({ root: rootReducer, loginInfo: logininfoReducer, likelist: likeListReducer }),
)
export const useTypedSelector: TypedUseSelectorHook<{
  root: IStore
  loginInfo: LoginInfoStore
  likelist: LikeListStore
}> = useSelector
