import React, { ReactNode, ComponentProps, useState } from 'react'
import './List.scss'
import { View, Slot } from '../wrappers'

/* --------------------------------- TODOLIST -------------------------------- */
// TODO 需要支持头部组件
// TODO 需要支持尾部组件
// TODO 需要支持上拉事件
// TODO 需要支持下拉事件

/* ---------------------------------- 组件约定 ---------------------------------- */

function List<T>({
  noSelfSelected = false,
  data = [],
  initSelectedIndex = NaN,
  itemKey = (_, idx) => String(idx),
  onSelectItem,
  renderItem,
  ...restProps
}: {
  /** 其选择判断逻辑无需自身控制，<Menu>专用 */
  noSelfSelected?: boolean
  /**存放List数据 */
  data?: T[]
  /**初始选择的index */
  initSelectedIndex?: number
  /**用作Key的对象的属性名 */
  itemKey?: ((item: T, index: number, items: T[]) => string) | keyof T
  /**当用户选择新属性时启用的回调 */
  onSelectItem?: (item: T, index: number, items: T[]) => any
  /**Slot：渲染每一个ListItem */
  renderItem?: (item: T, index: number, items: T[]) => ReactNode
} & ComponentProps<typeof View>) {
  /* ---------------------------------- 组件语法 ---------------------------------- */

  const [selectedIndex, setSelectedIndex] = useState(initSelectedIndex)
  return (
    <View {...restProps} $componentName='List' as='ul'>
      {data?.map((itemInfo, index) => (
        <Slot
          as='li'
          key={
            typeof itemKey === 'function'
              ? itemKey(itemInfo, index, data!)
              : itemInfo[String(itemKey)]
          }
          className={{
            _first: index === 0,
            _end: index === data.length - 1,
            _odd: index % 2 === 1,
            _even: index % 2 === 0,
            _selected: !noSelfSelected && index === selectedIndex,
          }}
          onClick={() => {
            onSelectItem?.(itemInfo, index, data!)
            setSelectedIndex(index)
          }}
        >
          {renderItem?.(itemInfo, index, data!)}
        </Slot>
      ))}
    </View>
  )
}

export default React.memo(List) as typeof List
