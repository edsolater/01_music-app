/**********
 *
 * 应用本身的状态
 *
 **********/

export type IStore = {
  playlistId: ID
}
export type IAction = {
  type: 'UPDATE_PLAYLIST_ID'
  playlistId: ID
}
export const reducer = (
  state = {
    playlistId: NaN,
  },
  action: IAction,
) => {
  switch (action.type) {
    case 'UPDATE_PLAYLIST_ID':
      //TODO - 需要使用immer，简化掉...state
      return { ...state, playlistId: action.playlistId }
    default:
      return state
  }
}
