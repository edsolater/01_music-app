import { createContext } from 'react'

const createStatedContext = <T extends AnyObject>(initState: T) =>
  createContext({
    ...initState,
    setState: (() => {}) as React.Dispatch<React.SetStateAction<typeof initState>>,
  })

export default createStatedContext
