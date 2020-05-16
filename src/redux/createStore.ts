import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { Dispatch } from 'react'

import {
  reducer as loginInfo,
  IStore as LoginInfoStore,
  IAction as LoginInfoAction,
} from './loginInfo'
import { reducer as inApp, IStore as InAppStore, IAction as InAppAction } from './inApp'
import {
  reducer as fromResponse,
  IStore as FromResponseStore,
  IAction as FromResponseAction,
} from './fromResponse'

type CombinedAction = LoginInfoAction | FromResponseAction | InAppAction
type CombinedStore = {
  loginInfo: LoginInfoStore
  fromResponse: FromResponseStore
  inApp: InAppStore
}
const combinedReducer = combineReducers({ loginInfo, fromResponse, inApp })

export const store = createStore(combinedReducer)
export const useTypedDispatch: () => Dispatch<CombinedAction> = useDispatch
export const useTypedSelector: TypedUseSelectorHook<CombinedStore> = useSelector
