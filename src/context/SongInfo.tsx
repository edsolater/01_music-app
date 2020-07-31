import React, { useReducer } from 'react'

type State = MusicInfo | AnyObject

type Action = { type: 'set from data'; songInfo: State }

const initState: State = {}
const reducer = (_state: State, action: Action): State => {
  switch (action.type) {
    case 'set from data': {
      return action.songInfo
    }
    default: {
      throw new Error(`from ${SongInfoProvider.name}'s reducer`)
    }
  }
}

export const SongInfoContext = React.createContext([initState, (_action: Action) => {}] as const)

export default function SongInfoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState)
  return <SongInfoContext.Provider value={[state, dispatch]}>{children}</SongInfoContext.Provider>
}
