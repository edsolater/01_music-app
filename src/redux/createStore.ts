import { useSelector, TypedUseSelectorHook, useDispatch, useStore } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { Dispatch, Reducer } from 'react'

import {
  reducer as loginInfo,
  IStore as LoginInfoState,
  IAction as LoginInfoAction
} from './loginInfo'
import { reducer as inApp, IStore as InAppState, IAction as InAppAction } from './inApp'
import { reducer as cache, IStore as CacheState, IAction as CacheAction } from './cache'
import {
  reducer as response,
  State as ResponseState,
  Action as ResponseAction,
  Action
} from './response'

export type CombinedAction = LoginInfoAction | CacheAction | InAppAction | ResponseAction
export type Store = {
  loginInfo: LoginInfoState
  cache: CacheState
  inApp: InAppState
  response: ResponseState
}
const combinedReducer = combineReducers({ loginInfo, cache, inApp, response } as {
  [T in keyof Store]: Reducer<any, any>
})

export const store = createStore(
  combinedReducer,
  //@ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export const useTypedDispatch: () => Dispatch<CombinedAction> = useDispatch
export const useTypedSelector: TypedUseSelectorHook<Store> = useSelector
export const useReduxState = () => useStore<Store, Action>().getState()
