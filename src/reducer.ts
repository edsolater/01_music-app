import { Dispatch } from 'react'
import { useDispatch } from 'react-redux'
/**reducer */
type IAction =
  | {
      type: 'LOAD_NEW_SONG'
      songUrl: string
    }
  | {
      type: 'SET_SONG_VOLUMN'
      volumNumber: number
    }
export const bigReducer = (state = {}, action: IAction) => {
  switch (action.type) {
    case 'LOAD_NEW_SONG':
      return {}
    default:
      return state
  }
}
export const useTypedDispatch = (): Dispatch<IAction> => useDispatch()
