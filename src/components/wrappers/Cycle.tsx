import React, { ComponentProps, ReactNode, useMemo, useEffect } from 'react'
import { View } from '.'
import { useNumber } from '../customHooks'
import { exist } from 'utils/judger'

interface CycleItem {
  node: ReactNode
  activeName?: string
  onActive?: (raw: CycleItem) => unknown
}
/**
 *  循环切换
 *  TODO - 对于 true/false 切换来说，这个组件过于复杂了，得换个更简单的
 */
export default function Cycle(
  props: ComponentProps<typeof View> & {
    activeIndex?: number
    /**初始时激活的序号，index，默认第一项 */
    initActiveIndex?: number
    /**初始时激活的序号，name */
    initActiveName?: CycleItem['activeName']
    /**
     * 序号改变时的回调
     */
    onIndexChange?: (newIndex: number) => unknown
    /**切换序列 */
    itemList?: CycleItem[]
  }
) {
  const initIndex = useMemo(
    () =>
      props.initActiveIndex ??
      props.activeIndex ??
      (props.itemList?.findIndex(({ activeName }) => activeName === props.initActiveName)! > 0
        ? props.itemList?.findIndex(({ activeName }) => activeName === props.initActiveName)
        : 0),
    []
  )

  // 这种组件本身有状态，父级也有状态能影响它的设计模式，UI非常快速响应
  const [activeIndex, activeIndexManager] = useNumber(initIndex)
  useEffect(() => {
    if (exist(props.activeIndex)) {
      activeIndexManager.set(props.activeIndex)
    }
  }, [props.activeIndex])

  return useMemo(
    () => (
      <View
        {...props}
        $componentName={`current:${props.itemList?.[activeIndex].activeName ?? activeIndex}`}
        onClick={e => {
          if (activeIndex === (props.itemList?.length ?? 1) - 1) {
            activeIndexManager.set(0)
          } else {
            activeIndexManager.add(1)
          }
          props.itemList?.[activeIndex]?.onActive?.(props.itemList?.[activeIndex])
          props.onIndexChange?.(activeIndex)
          props.onClick?.(e)
        }}
      >
        {props.itemList?.[activeIndex].node}
      </View>
    ),
    [activeIndex]
  )
}
