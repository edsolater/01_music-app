/**********
 *
 * 应用本身的状态
 *
 **********/

import produce from 'immer'

export type IStore = {
  playlistId: ID
}
export type IAction = {
  type: 'UPDATE_PLAYLIST_ID'
  playlistId: ID
}
export const reducer = produce(
  (draft: IStore, action: IAction) => {
    switch (action.type) {
      case 'UPDATE_PLAYLIST_ID':
        draft.playlistId = action.playlistId
        return
    }
  },
  {
    playlistId: NaN,
  },
)
