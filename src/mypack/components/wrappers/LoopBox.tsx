import React, { ComponentProps, ReactNode } from 'react'
import { View } from '../lower'
import { useMaster } from '../customHooks'

interface LoopItem {
  node: ReactNode
  activeName?: string
  onActive?: (raw: LoopItem) => unknown
}
/**
 *  根据逻辑循环切换子内容，类似于微信小程序中的 <swiper> 组件
 */
export default function LoopBox(
  props: ComponentProps<typeof View> & {
    /**初始时激活的序号，默认第一项 */
    initActiveIndex?: number
    /**
     * 序号改变时的回调
     */
    onIndexChange?: (newIndex: number) => unknown

    /**切换序列 */
    itemList?: LoopItem[]
  },
) {
  const activeIndex = useMaster({ type: 'number', init: props.initActiveIndex ?? 0 })
  return (
    <View
      {...props}
      $componentName={[
        'LoopBox',
        props.itemList?.[activeIndex.value].activeName ?? activeIndex.value,
      ]}
      onClick={e => {
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
