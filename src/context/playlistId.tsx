import React, { useReducer } from 'react'

type State = ID

type Action = { type: 'set'; playlistId: State }

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
const initState = 2 as State

// TODO - 一下逻辑同级文件写了很多次了，可以封装到公共index.tsx
export const PlaylistIdContext = React.createContext([initState, (_action: Action) => {}] as const)

export default function PlaylistIdProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <PlaylistIdContext.Provider value={[state, dispatch]}>{children}</PlaylistIdContext.Provider>
  )
}
