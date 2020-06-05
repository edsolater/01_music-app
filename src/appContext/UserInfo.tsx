import React, { useReducer } from 'react'

type State = {
  account: IAccount
  profile: IProfile
  token: string
}

type Action = { type: 'set'; account: IAccount; profile: IProfile; token: string }

const initState: State = { account: {}, profile: {}, token: '' }
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set': {
      return { ...state, account: action.account, profile: action.profile, token: action.token }
    }
    default: {
      throw new Error(`from ${UserInfoProvider.name}'s reducer`)
    }
  }
}

export const UserInfoContext = React.createContext([initState, (_action: Action) => {}] as const)

export default function UserInfoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState)
  return <UserInfoContext.Provider value={[state, dispatch]}>{children}</UserInfoContext.Provider>
}
