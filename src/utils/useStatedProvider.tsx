import React, { useState, useMemo, Context } from 'react'

export default function useStatedProvider<T extends Context<any>>(context: T) {
  //全局状态
  // @ts-ignore
  const [currentContextState, setCurrentContextState] = useState(context.Consumer._currentValue)
  const currentContextStateWithSetter = useMemo(
    () => ({
      ...currentContextState,
      setState: setCurrentContextState,
    }),
    [currentContextState],
  )
  const StatedProvider = useMemo(
    () => (props) => (
      <context.Provider value={currentContextStateWithSetter}>{props.children}</context.Provider>
    ),
    [currentContextState],
  )
  return StatedProvider
}
