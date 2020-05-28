/**********
 *
 * 应用本身的状态
 *
 **********/

import produce from 'immer'
import { State, initState } from 'application/Player'

export type IStore = State

type StateAdaptor<T> = ((oldVlaue: T) => T) | T

export type IAction = {
  type: 'UPDATE_PLAYER_DATA'
  state: StateAdaptor<IStore>
}

export const reducer = produce((draft: IStore, action: IAction) => {
  switch (action.type) {
    case 'UPDATE_PLAYER_DATA': {
      const newValue = typeof action.state === 'function' ? action.state(draft) : action.state
      draft = newValue // TODO 这里的全部设定会需要一个diff
      return
    }
  }
}, initState)
