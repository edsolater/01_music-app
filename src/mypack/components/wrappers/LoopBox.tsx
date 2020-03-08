import React, { ComponentProps } from 'react'
import { View } from '../basicElements'
import { useMaster } from '../customHooks'

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
    onActiveIndexChange?: (newIndex: number) => unknown
  },
) {
  const activeIndex = useMaster({ type: 'number', init: props.initActiveIndex ?? 0 })
  const childrens = React.Children.toArray(props.children)
  const maxIndex = childrens.length
  return (
    <View
      {...props}
      $componentName='LoopBox'
      onClick={e => {
        if (activeIndex.value === maxIndex - 1) {
          activeIndex.set(0)
        } else {
          activeIndex.add(1)
        }
        props.onActiveIndexChange?.(activeIndex.value)
        props.onClick?.(e)
      }}
    >
      {childrens[activeIndex.value]}
    </View>
  )
}
