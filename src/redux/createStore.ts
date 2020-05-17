import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { Dispatch, Reducer } from 'react'

import {
  reducer as loginInfo,
  IStore as LoginInfoState,
  IAction as LoginInfoAction,
} from './loginInfo'
import { reducer as inApp, IStore as InAppState, IAction as InAppAction } from './inApp'
import { reducer as cache, IStore as CacheState, IAction as CacheAction } from './cache'
import { reducer as player, IStore as PlayerState, IAction as PlayerAction } from './player'

type CombinedAction = LoginInfoAction | CacheAction | InAppAction | PlayerAction
type Store = {
  loginInfo: LoginInfoState
  cache: CacheState
  inApp: InAppState
  player: PlayerState
}
const combinedReducer = combineReducers({ loginInfo, cache, inApp, player } as {
  [T in keyof Store]: Reducer<any, any>
})

export const store = createStore(combinedReducer)
export const useTypedDispatch: () => Dispatch<CombinedAction> = useDispatch
export const useTypedSelector: TypedUseSelectorHook<Store> = useSelector
