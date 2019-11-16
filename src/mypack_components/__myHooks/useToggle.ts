import { useState, useDebugValue } from 'react'

export const useToggle = initState => {
  const [state, changeStateFunction] = useState(initState)
  const toggle = () => {
    changeStateFunction(!state)
  }
  useDebugValue(state ? 'on' : 'off')
  return [state, toggle]
}
