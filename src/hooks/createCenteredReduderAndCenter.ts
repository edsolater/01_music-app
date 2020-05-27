import { useReducer, useRef, useEffect } from 'react'

const componentStoreCenter = {}

/**
 * 给子组件用的
 */
//@ts-ignore
export const useCenterReducer: typeof useReducer = (...args) => {
  //@ts-ignore
  const [state, dispatch] = useReducer(...args)
  const componentID = useRef(Math.random())
  useEffect(() => {
    componentStoreCenter[componentID.current] = {
      state,
      dispatch
    }
  }, [state])
  return [state, dispatch]
}

/**
 * TODO: 给父组件用的（一般是App）
 */
export const useCenteredCollection = componentID => {
  return componentStoreCenter[componentID]
}
