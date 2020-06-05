import React, { useReducer } from 'react'

type State = MusicInfo

type Action = { type: 'set'; songInfo: State }

const initState: State = {}
const reducer = (_state: State, action: Action): State => {
  switch (action.type) {
    case 'set': {
      return action.songInfo
    }
    default: {
      throw new Error(`${SongInfoProvider.name} 的 reducer 报错`)
    }
  }
}

export const SongInfoContext = React.createContext([initState, (_action: Action) => {}] as const)
export default function SongInfoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState)
  return <SongInfoContext.Provider value={[state, dispatch]}>{children}</SongInfoContext.Provider>
}
