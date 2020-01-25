import React, { ComponentProps, Fragment, ReactNode } from 'react'
import { ComponentRoot, Slot } from '.'
import './List.scss'
import { useMaster } from './customHooks'

/**
 * List组件的的Props
 */
type IProps<T> = {
  /**存放List数据 */
  data?: T[]
  /**用作Key的对象的属性名 */
  keyPropname?: string
  /**当用户选择新属性时启用的回调 */
  onSelectItem?: (item: T, index: number, items: T[]) => any
  /**Slot：渲染每一个ListItem */
  __ListItem?: (item: T, index: number, items: T[]) => ReactNode
  /**Slot：渲染分隔符 */
  __Between?: (item: T, index: number, items: T[]) => ReactNode
}

/**
 * React组件
 */
function List<T>(props: ComponentProps<typeof ComponentRoot> & IProps<T>) {
  const selectedIndex = useMaster({ type: 'number' })
  const { data, __ListItem: __List, __Between: _, keyPropname, onSelectItem, ...restProps } = props //TODO: 这个解决方案不够简约
  return (
    <ComponentRoot name='List' {...restProps}>
      {props.data?.map((itemInfo, index) => (
        <Fragment key={itemInfo[props.keyPropname ?? ''] ?? index}>
          <Slot
            slotName={['__ListItem', { _selected: index === selectedIndex.getValue() }]}
            onClick={() => {
              selectedIndex.set(index)
              props.onSelectItem?.(itemInfo, index, props.data!)
            }}
          >
            {props.__ListItem?.(itemInfo, index, props.data!)}
          </Slot>
          {props.data && index !== Number(props.data?.length) - 1 && props.__Between && (
            <Slot slotName='__Divider'>{props.__Between?.(itemInfo, index, props.data!)}</Slot>
          )}
        </Fragment>
      ))}
    </ComponentRoot>
  )
}

export default React.memo(List) as typeof List
