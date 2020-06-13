import React, { useReducer } from 'react'

type State = ID

type Action = { type: 'set'; playlistId: State }

const initState = 1 as State
const reducer = (_state: State, action: Action): State => {
  switch (action.type) {
    case 'set': {
      return action.playlistId
    }
    default: {
      throw new Error(`from ${PlaylistIdProvider.name}'s reducer`)
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
