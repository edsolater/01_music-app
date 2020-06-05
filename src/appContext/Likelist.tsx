import React, { useReducer } from 'react'

type State = ID[]

type Action = { type: 'set'; newLikelist: State }

const initState: State = []
const reducer = (_state: State, action: Action): State => {
  switch (action.type) {
    case 'set': {
      return action.newLikelist
    }
    default: {
      throw new Error(`${LikelistProvider.name} 的 reducer 报错`)
    }
  }
}

export const LikelistContext = React.createContext([initState, (_action: Action) => {}] as const)
export default function LikelistProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState)
  return <LikelistContext.Provider value={[state, dispatch]}>{children}</LikelistContext.Provider>
}
