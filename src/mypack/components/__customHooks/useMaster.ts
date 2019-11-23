import { useState } from 'react'
import { StateBooleanUI } from 'mypack/class'

/**
 * 输入初始状态（boolean），返回一个能控制开关状态的对象
 */
const useStateBooleanUI = (init: boolean) => {
  const [state, setState] = useState(init)
  return new StateBooleanUI(state, setState)
}

type ComponentMasters = {
  'open-close': ReturnType<typeof useStateBooleanUI>
}

/**
 * 返回一个 “组件监工”，它操控component的行为
 */
const useMaster = <T extends keyof ComponentMasters>(config: {
  type: T
  init?: any
}): ComponentMasters[T] => {
  // @ts-ignore
  if (config.type === 'open-close') return useStateBooleanUI(Boolean(config.init))
  else throw Error()
}

export default useMaster
