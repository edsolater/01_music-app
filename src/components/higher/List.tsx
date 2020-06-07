import React, { ReactNode, ComponentProps } from 'react'
import './List.scss'
import { useNumber } from '../customHooks'
import { View, Slot } from '../wrappers'

/**
 * React组件
 */
function List<T>(
  props: ComponentProps<typeof View> & {
    /** 其选择判断逻辑无需自身控制，<Menu>专用 */
    $noSelfSelected?: boolean
    /**存放List数据 */
    data?: T[]
    /**初始选择的index */
    initSelectedIndex?: number
    /**用作Key的对象的属性名 */
    itemKey?: ((item: T, index: number, items: T[]) => string | number | undefined) | keyof T
    /**当用户选择新属性时启用的回调 */
    onSelectItem?: (item: T, index: number, items: T[]) => unknown
    /**Slot：渲染每一个ListItem */
    renderItem?: (item: T, index: number, items: T[]) => ReactNode
  },
) {
  const [selectedIndex, selectedIndexManager] = useNumber(props.initSelectedIndex)
  return (
    <View {...props} $componentName='List' as='ul'>
      {props.data?.map((itemInfo, index) => {
        return (
          <Slot
            key={
              typeof props.itemKey === 'function'
                ? props.itemKey(itemInfo, index, props.data!)
                : itemInfo[String(props.itemKey)]
            }
            className={[
              {
                _selected: !props.$noSelfSelected && index === selectedIndex,
              },
              index % 2 === 1 ? '_odd' : '_even',
            ]}
            onClick={() => {
              props.onSelectItem?.(itemInfo, index, props.data!)
              selectedIndexManager.set(index)
            }}
          >
            {props.renderItem?.(itemInfo, index, props.data!)}
          </Slot>
        )
      })}
    </View>
  )
}

export default React.memo(List) as typeof List