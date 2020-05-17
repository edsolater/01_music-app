/**********
 *
 * 应用本身的状态
 *
 **********/

import produce from 'immer'

export type IStore = {
  /* 播放器音量，介于0与1之间 */
  volumn: number
  /**
   * 播放器过去的时间的毫秒数
   */
  passedMilliseconds: number
}
const initState: IStore = {
  volumn: 1,
  passedMilliseconds: 0,
}

export type IAction =
  | {
      type: 'SET_PLAYER_VOLUMN'
      volumn: StateAdaptor<IStore['volumn']>
    }
  | {
      type: 'SET_PLAYER_PASSED_MILLISECONDS'
      passedMilliseconds: StateAdaptor<IStore['passedMilliseconds']>
    }

export const reducer = produce((draft: IStore, action: IAction) => {
  switch (action.type) {
    case 'SET_PLAYER_VOLUMN': {
      const newValue =
        typeof action.volumn === 'function' ? action.volumn(draft.volumn) : action.volumn
      draft.volumn = newValue
      return
    }
    case 'SET_PLAYER_PASSED_MILLISECONDS': {
      const newValue =
        typeof action.passedMilliseconds === 'function'
          ? action.passedMilliseconds(draft.passedMilliseconds)
          : action.passedMilliseconds
      draft.passedMilliseconds = newValue
      return
    }
  }
}, initState)
