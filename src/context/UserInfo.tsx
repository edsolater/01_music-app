import React, { useReducer, useEffect } from 'react'
import { storage } from 'api/localStorage'

type State = {
  account: UserAccount | undefined
  profile: UserProfile | undefined
  token: string | undefined
}

type Action = { type: 'set from data'; account: UserAccount; profile: UserProfile; token: string }

const initState: State = { account: undefined, profile: undefined, token: '' }
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set from data': {
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
  useEffect(() => {
    storage.set('account', state.account)
  }, [state.account])
  useEffect(() => {
    storage.set('profile', state.profile)
  }, [state.profile])
  useEffect(() => {
    storage.set('token', state.token)
  }, [state.token])
  return <UserInfoContext.Provider value={[state, dispatch]}>{children}</UserInfoContext.Provider>
}
