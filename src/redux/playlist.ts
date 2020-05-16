import { locolStoragePrefix } from 'settings'

export type IStore = ID[]
export type IAction = {
  type: 'SET_LIKELIST'
  likelist: IStore
}
export const reducer = (
  state = JSON.parse(window.localStorage.getItem(`${locolStoragePrefix}likeList`) || '[]'),
  action: IAction,
) => {
  switch (action.type) {
    case 'SET_LIKELIST':
      return action.likelist
    default:
      return state
  }
}
