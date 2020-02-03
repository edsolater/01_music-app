import React, { ReactNode } from 'react'
import { ComponentRoot, Slot, componentRootProps, ComponentRootPorpType, $For } from '.'
import './List.scss'
import { useMaster } from './customHooks'
import { pick } from '../utils'

/**
 * List组件的的Props
 */
type IProps<T> = {
  /**存放List数据 */
  data?: T[]
  /**初始选择的index */
  initSelectedIndex?: number
  /**用作Key的对象的属性名 */
  keyPropname?: string
  /**当用户选择新属性时启用的回调 */
  onSelectItem?: (item: T, index: number, items: T[]) => any
  /**Slot：渲染每一个ListItem */
  __ListItem?: (item: T, index: number, items: T[]) => ReactNode
  /**Slot：渲染分隔符 */
  __Between?: (item: T, index: number, items: T[]) => ReactNode
}

//TODO:最后做成一个类似 scroll-view 的 list 特异性组件
/**
 * React组件
 */
function List<T, O>(props: ComponentRootPorpType<O> & IProps<T>) {
  const selectedIndex = useMaster({ type: 'number', init: props.initSelectedIndex })
  return (
    <ComponentRoot {...pick(props, componentRootProps)} name='List'>
      <$For $for={props.data} keyProp={props.keyPropname}>
        {(itemInfo, index) => (
          <Slot
            slotName={['__ListItem', { _selected: index === selectedIndex.getValue() }]}
            onClick={() => {
              props.onSelectItem?.(itemInfo, index, props.data!)
              selectedIndex.set(index)
            }}
          >
            {props.__ListItem?.(itemInfo, index, props.data!)}
          </Slot>
        )}
      </$For>
    </ComponentRoot>
  )
}

export default React.memo(List) as typeof List
