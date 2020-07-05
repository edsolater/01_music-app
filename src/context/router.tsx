import React, { useReducer } from 'react'

type PathItem = {
  name: '' | /* 空白页，默认 */ 'mvList' | 'mvDetail' | 'playlist' | 'all' /* 全部 */
  id?: ID
}

// IDEA 既然理想状态写这个就是写一个配置文件，不妨写成易于理解的大配置对象

type State = {
  // TODO 做成有last属性的数组超集
  stack: PathItem[]
}
type Computed = {
  last: PathItem
}
const initState: State & Computed = { stack: [], last: { name: '' } }
type Action =
  | { type: 'set'; stack: State['stack'] }
  | { type: 'push'; item: ArrayItem<State['stack']> }

function pureReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set': {
      return { ...state, stack: action.stack }
    }
    case 'push': {
      return { ...state, stack: [...state.stack, action.item] }
    }
    default: {
      throw new Error(`from ${RouterProvider.name}'s reducer`)
    }
  }
} // TODO 可以封装
function compute(
  reducer: typeof pureReducer
): (...args: Parameters<typeof pureReducer>) => State & Computed {
  return function highReducer(...args) {
    const state = reducer(...args)
    const last = state.stack[state.stack.length - 1]
    return { ...state, last }
  }
}
const reducer = compute(pureReducer)

export const RouterContext = React.createContext([initState, (_action: Action) => {}] as const)
export default function RouterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState)
  return <RouterContext.Provider value={[state, dispatch]}>{children}</RouterContext.Provider>
}
