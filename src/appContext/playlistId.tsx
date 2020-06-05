import React, { useReducer } from 'react'

type State = ID

type Action = { type: 'set'; playlistId: State }

const initState = '' as State
const reducer = (_state: State, action: Action): State => {
  switch (action.type) {
    case 'set': {
      return action.playlistId
    }
    default: {
      throw new Error(`${PlaylistIdProvider.name} 的 reducer 报错`)
    }
  }
}

export const PlaylistIdContext = React.createContext([initState, (_action: Action) => {}] as const)
export default function PlaylistIdProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <PlaylistIdContext.Provider value={[state, dispatch]}>{children}</PlaylistIdContext.Provider>
  )
}
