import { useReducer, useRef, useEffect, Dispatch } from 'react'

import { LocalState as PlayerBarState, LocalAction as PlayerBarAction } from 'application/PlayerBar'

type LocalStore = {
  playerbar?: {
    store?: PlayerBarState
    dispatch?: Dispatch<PlayerBarAction>
  }
}

const componentStoreCenter = {}
/**
 * 是useReducer的一个包装
 */
export const createUseCachedReducer: (
  componentName: keyof LocalStore
  //@ts-ignore
) => typeof useReducer = componentName => (...args) => {
  //@ts-ignore
  const [state, dispatch] = useReducer(...args)
  const componentNameRef = useRef(componentName)
  useEffect(() => {
    componentStoreCenter[componentNameRef.current] = { state, dispatch }
  }, [state])
  return [state, dispatch]
}

/**
 * TODO: 给需要访问数据的子组件用的
 */
export const getAnotherState = <T>(path: (localStore: LocalStore) => T) => {
  return path(componentStoreCenter)
}
