import React, { ReactNode, ComponentProps } from 'react'
import './List.scss'
import { useMaster } from '../customHooks'
import { View, Slot } from '../lower'

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
}

/**
 * React组件
 */
function List<T>(props: ComponentProps<typeof View> & IProps<T>) {
  const selectedIndex = useMaster({ type: 'number', init: props.initSelectedIndex })
  return (
    <View $tag='ul' {...props} $componentName='List'>
      {props.data?.map((itemInfo, index) => {
        return (
          <Slot
            $tag='li'
            key={
              typeof props.keyForListItems === 'function'
                ? props.keyForListItems(itemInfo, index, props.data!)
                : itemInfo[String(props.keyForListItems)]
            }
            slotName={[
              '__Item',
              '__ListItem',
              {
                _selected: index === selectedIndex.value,
              },
              index % 2 === 1 ? '_odd' : '_even',
            ]}
            onClick={() => {
              props.onSelectItem?.(itemInfo, index, props.data!)
              selectedIndex.set(index)
            }}
          >
            {props.renderListItem?.(itemInfo, index, props.data!)}
          </Slot>
        )
      })}
    </View>
  )
}

export default React.memo(List) as typeof List
