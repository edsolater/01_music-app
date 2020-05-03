import React, { ComponentProps, ReactNode, useMemo } from 'react'
import { View } from '.'
import { useNumber } from '../customHooks'

interface CycleItem {
  node: ReactNode
  activeName?: string
  onActive?: (raw: CycleItem) => unknown
}
/**
 *  循环切换
 */
export default function Cycle(
  props: ComponentProps<typeof View> & {
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
  },
) {
  const initIndex = useMemo(
    () =>
      props.initActiveIndex ??
      (props.itemList?.findIndex(({ activeName }) => activeName === props.initActiveName)! > 0
        ? props.itemList?.findIndex(({ activeName }) => activeName === props.initActiveName)
        : 0),
    [],
  )
  const [activeIndex, activeIndexManager] = useNumber(initIndex)
  return (
    <View
      {...props}
      $componentName={`current:${props.itemList?.[activeIndex].activeName ?? activeIndex}`}
      onClick={(e) => {
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
  )
}
