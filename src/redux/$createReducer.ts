import { Dispatch } from 'react'
import { useDispatch } from 'react-redux'
/**reducer */
type IAction =
  | {
      type: 'UPDATE_LOGIN_INFO'
      data: {
        profile?: IProfile
        account?: IAccount
        token?: string
      }
    }
  | {
      type: 'UPDATE_MENU'
      data: {
        hello: string
      }
    }
export const rootReducer = (state = {}, action: IAction) => {
  switch (action.type) {
    case 'UPDATE_LOGIN_INFO':
      return { ...state, loginRes: { ...((state as any).loginRes as any), ...action.data } } // FIXME
    default:
      return state
  }
}
export const useTypedDispatch = (): Dispatch<IAction> => useDispatch()
