import { useStateBooleanUI } from './useStateBooleanUI'

type TaskMasters = {
  'open-close': ReturnType<typeof useStateBooleanUI>
  'depth': string
}

/**
 * 返回一个 “组件监工”，它操控component的行为
 */
export const useComponentMaster = <T extends keyof TaskMasters>(config: {
  type: T
  init?: any
}): TaskMasters[T] => {
  if (config.type === 'open-close') {
    // @ts-ignore
    return useStateBooleanUI(Boolean(config.init))
  } else {
    // @ts-ignore
    return 'hello'
  }
}


