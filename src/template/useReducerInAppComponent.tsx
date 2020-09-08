import { useReducer } from 'react'

const initState = {}
type State = {}
type Action = {
  type: 'del'
} & Partial<State>

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    default:
      return state
  }
}

export default function AppComponent() {
  const [state, dispatch] = useReducer(reducer, initState)
  return null
}
