import { Action } from 'redux'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'react'

type IAction =
  | { type: 'LOAD_NEW_SONG'; songUrl: string }
  | { type: 'SET_SONG_VOLUMN'; volumNumber: number }

export const bigReducer = (state = {}, action: IAction) => {
  switch (action.type) {
    case 'LOAD_NEW_SONG':
      return {}
    default:
      return state
  }
}

// export const dispatchEvent = {
//   playNewMusic(newMusic) {
//     return this
//   },
//   loadNewMusicList() {
//     return this
//   },
//   switchPlayMode() {
//     return this
//   },
//   setVolumn(newVolumn) {
//     //IDEA： 要一个 middleware 系统
//     // asyncDo(() => {
//     //   this.playerBar.volumn = newVolumn
//     // })
//     return this
//   },
//   createNewMusicCollection() {
//     return this
//   },
//   async getAllstore() {
//     //TODO 这里逻辑没写全
//     return JSON.parse(JSON.stringify(this))
//   },
// }

export const useTypedDispatch = (): Dispatch<IAction> => useDispatch()
