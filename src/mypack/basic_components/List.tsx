import React, { ReactNode } from 'react'
import { ComponentRoot, Slot, componentRootProps, ComponentRootPorpType } from '.'
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
  keyForListItems?: ((item: T, index: number, items: T[]) => string | number | undefined) | keyof T
  /**当用户选择新属性时启用的回调 */
  onSelectItem?: (item: T, index: number, items: T[]) => unknown
  /**Slot：渲染每一个ListItem */
  renderListItem?: (item: T, index: number, items: T[]) => ReactNode
  /**Slot：渲染分隔符 */
  renderBetween?: (item: T, index: number, items: T[]) => ReactNode
}

//TODO:最后做成一个类似 scroll-view 的 list 特异性组件
/**
 * React组件
 */
function List<T, O>(props: ComponentRootPorpType<O> & IProps<T>) {
  const selectedIndex = useMaster({ type: 'number', init: props.initSelectedIndex })
  return (
    <ComponentRoot {...pick(props, componentRootProps)} name='List'>
      {props.data?.map((itemInfo, index) => {
        return (
          <Slot
            key={
              typeof props.keyForListItems === 'function'
                ? props.keyForListItems(itemInfo, index, props.data!)
                : itemInfo[String(props.keyForListItems)]
            }
            slotName={['List__Item', { _selected: index === selectedIndex.getValue() }]}
            onClick={() => {
              props.onSelectItem?.(itemInfo, index, props.data!)
              selectedIndex.set(index)
            }}
          >
            {props.renderListItem?.(itemInfo, index, props.data!)}
          </Slot>
        )
      })}
    </ComponentRoot>
  )
}

export default React.memo(List) as typeof List
