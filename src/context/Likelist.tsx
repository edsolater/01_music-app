import React, { useReducer } from 'react'

export type LikelistState = Set<ID>

export type LikelistAction = { type: 'set from data'; newLikelist?: ID[] }

const initState: LikelistState = new Set()
const reducer = (state: LikelistState, action: LikelistAction): LikelistState => {
  switch (action.type) {
    case 'set from data': {
      return new Set(action.newLikelist)
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
