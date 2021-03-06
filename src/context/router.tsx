import React, { useReducer } from 'react'

type PathItem = {
  /**设计思想上类似于域名 */
  name: '' | 'mvDetail' | 'playlist' | 'menu'
  /**设计思想上类似于端口号 */
  id?: ID
}

// IDEA 既然理想状态写这个就是写一个配置文件，不妨写成易于理解的大配置对象

type OriginalState = {
  // TODO 做成有last属性的数组超集
  stack: PathItem[]
}
type ComputedState = {
  last: PathItem
}
type State = OriginalState & ComputedState
type Action =
  | { type: 'set from data'; stack: OriginalState['stack'] }
  | { type: 'to'; item: ArrayItem<OriginalState['stack']> }
  | { type: 'back' }

function computeLast(originalState: OriginalState): State {
  return { ...originalState, last: originalState.stack[originalState.stack.length - 1] }
}
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set from data': {
      return computeLast({ ...state, stack: action.stack })
    }
    case 'to': {
      return computeLast({ ...state, stack: [...state.stack, action.item] })
    }
    case 'back': {
      if (state.stack.length <= 1) return state
      const clonedStack = [...state.stack]
      clonedStack.pop()
      return computeLast({ ...state, stack: clonedStack })
    }
    default: {
      throw new Error(`from ${RouterProvider.name}'s reducer`)
    }
  }
}
const initState = computeLast({ stack: [{ name: '' }] })

export const RouterContext = React.createContext([initState, (_action: Action) => {}] as const)
export default function RouterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState)
  return <RouterContext.Provider value={[state, dispatch]}>{children}</RouterContext.Provider>
}
