import { locolStoragePrefix } from 'settings'

export type IStore = {
  profile: IProfile
  account: IAccount
  token: string
}
export type IAction = {
  type: 'SET_LOGIN_INFO'
  loginInfo: IStore
}
export const reducer = (
  state = {
    profile: JSON.parse(
      window.localStorage.getItem(`${locolStoragePrefix}profile`) || '{}',
    ) as IProfile,
    account: JSON.parse(
      window.localStorage.getItem(`${locolStoragePrefix}account`) || '{}',
    ) as IAccount,
    token: JSON.parse(window.localStorage.getItem(`${locolStoragePrefix}token`) || '""') as string,
  },
  action: IAction,
) => {
  switch (action.type) {
    case 'SET_LOGIN_INFO':
      return { ...state, loginInfo: action.loginInfo }
    default:
      return state
  }
}
