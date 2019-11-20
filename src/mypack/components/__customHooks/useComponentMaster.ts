import { useStateBooleanUI } from './useStateBooleanUI'

type ComponentMasters = {
  'open-close': ReturnType<typeof useStateBooleanUI>
}

/**
 * 返回一个 “组件监工”，它操控component的行为
 */
export const useComponentMaster = <T extends keyof ComponentMasters>(config: {
  type: T
  init?: any
}): ComponentMasters[T] => {
  // @ts-ignore
  if (config.type === 'open-close') return useStateBooleanUI(Boolean(config.init))
  else throw Error()
}
