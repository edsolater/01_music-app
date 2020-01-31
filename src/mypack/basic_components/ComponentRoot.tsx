import React, { ReactElement } from 'react'
import { ClassValue } from 'classnames/types'
import { View, ViewProp, ViewPropType } from '.'
import { pick } from 'mypack/utils'

export type ComponentRootPorpType<O extends any> = ViewPropType<O> & {
  /**
   * 用于各个组件定义组件的名字更方便
   */
  name?: ClassValue
}

export const componentRootProps: (keyof ComponentRootPorpType<any>)[] = [
  'name',
  'className',
  'style',
  'onClick',
  '$if',
  '$for',
  '$clone',
  'html',
  'children',
]

/**组件代码 */
function ComponentRoot<O>(
  props: ComponentRootPorpType<O>,
  ref,
) {
  return <View ref={ref} {...pick(props, ViewProp)} className={[props.className, props.name]} />
}

export default React.memo(React.forwardRef(ComponentRoot)) as <O>(
  props: ComponentRootPorpType<O>,
) => ReactElement | null