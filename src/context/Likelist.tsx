import React, { useReducer } from 'react'

export type LikelistState = ID[]

export type LikelistAction = { type: 'set by data'; newLikelist: LikelistState }

const initState: LikelistState = []
const reducer = (_state: LikelistState, action: LikelistAction): LikelistState => {
  switch (action.type) {
    case 'set by data': {
      return action.newLikelist
    }
    default: {
      throw new Error(`from ${LikelistProvider.name}'s reducer`)
    }
  }
}

export const LikelistContext = React.createContext([
  initState,
  (_action: LikelistAction) => {}
] as const)

export default function LikelistProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState)
  return <LikelistContext.Provider value={[state, dispatch]}>{children}</LikelistContext.Provider>
}
