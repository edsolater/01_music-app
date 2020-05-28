/**********
 *
 * 应用本身的状态
 *
 **********/

import produce from 'immer'

export type IStore = {
  // 这是跨组件注入，必须足够地约法三章，能对跨组件状态使用另一个redux就好了。思想上认为他是与组件树无关的状态，就更好理解了
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
    playlistId: NaN
  }
)
