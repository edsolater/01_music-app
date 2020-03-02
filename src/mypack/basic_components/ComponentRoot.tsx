import React from 'react'
import { ClassValue } from 'classnames/types'
import { View, ViewProp, ViewPropType } from '.'
import { pick } from '../utils'

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

export default React.forwardRef(ComponentRoot) as typeof ComponentRoot