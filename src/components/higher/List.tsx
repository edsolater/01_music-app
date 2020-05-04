import React, { ReactNode, ComponentProps } from 'react'
import './List.scss'
import { useNumber } from '../customHooks'
import { View, Slot } from '../wrappers'

/* ---------------------------------- 组件约定 ---------------------------------- */

function List<T>({
  noSelfSelected = false,
  listData = [],
  initSelectedIndex = NaN,
  itemKey = (_, idx) => String(idx),
  onSelectItem,
  renderItem,
  ...restProps
}: {
  /** 其选择判断逻辑无需自身控制，<Menu>专用 */
  noSelfSelected?: boolean
  /**存放List数据 */
  listData?: T[]
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

  const [selectedIndex, selectedIndexManager] = useNumber(initSelectedIndex)
  return (
    <View {...restProps} $componentName='List' as='ul'>
      {listData?.map((itemInfo, index) => (
        <Slot
          as='li'
          key={
            typeof itemKey === 'function'
              ? itemKey(itemInfo, index, listData!)
              : itemInfo[String(itemKey)]
          }
          className={{
            _first: index === 0,
            _end: index === listData.length - 1,
            _odd: index % 2 === 1,
            _even: index % 2 === 0,
            _selected: !noSelfSelected && index === selectedIndex,
          }}
          onClick={() => {
            onSelectItem?.(itemInfo, index, listData!)
            selectedIndexManager.set(index)
          }}
        >
          {renderItem?.(itemInfo, index, listData!)}
        </Slot>
      ))}
    </View>
  )
}

export default React.memo(List) as typeof List
