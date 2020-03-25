import React, { ComponentProps, ReactNode, useMemo } from 'react'
import { View } from '.'
import { useMaster } from '../customHooks'

interface CycleItem {
  node: ReactNode
  activeName?: string
  onActive?: (raw: CycleItem) => unknown
}
/**
 *  循环切换
 */
export default function CycleBox(
  props: ComponentProps<typeof View> & {
    /**初始时激活的序号，默认第一项 */
    initActiveIndex?: number
    /**初始时激活的序号，使用名字 */
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
  const activeIndex = useMaster({
    type: 'number',
    init: initIndex,
  })
  return (
    <View
      {...props}
      $componentName={`current:${
        props.itemList?.[activeIndex.value].activeName ?? activeIndex.value
      }`}
      onClick={(e) => {
        if (activeIndex.value === (props.itemList?.length ?? 1) - 1) {
          activeIndex.set(0)
        } else {
          activeIndex.add(1)
        }
        props.itemList?.[activeIndex.value]?.onActive?.(props.itemList?.[activeIndex.value])
        props.onIndexChange?.(activeIndex.value)
        props.onClick?.(e)
      }}
    >
      {props.itemList?.[activeIndex.value].node}
    </View>
  )
}
