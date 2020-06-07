import React, { ComponentProps, ReactNode, useMemo, useEffect, useState } from 'react'
import { View } from '.'
import { exist } from 'utils/judger'

/**
 *  循环切换
 *  TODO - 对于 true/false 切换来说，这个组件过于复杂了（数字代表的空间位置对true/false来说是没必要的思考负担），得换个更简单的
 */
export default function Cycle(
  props: ComponentProps<typeof View> & {
    active?: number
    /**初始时激活的序号，index，默认第一项 */
    initActive?: number
    /**切换序列 */
    itemList?: ReactNode[]
    /**
     * 序号改变时的回调
     */
    onChange?: (newIndex: number, node: ReactNode | undefined) => void
  }
) {
  // 这种组件本身有状态，父级也有状态能影响它的设计模式，UI非常快速响应
  const [activeIndex, setActiveIndex] = useState(props.initActive ?? props.active ?? 0)
  useEffect(() => {
    if (exist(props.active)) {
      setActiveIndex(props.active)
    }
  }, [props.active])

  return useMemo(
    () => (
      <View
        {...props}
        $componentName={`${Cycle.name}`}
        onClick={e => {
          // TODO 按照思维模型来说，要提取成 looplyIncrease 工具函数
          setActiveIndex(n => (n + 1) % (props.itemList?.length ?? NaN))
          props.onChange?.(activeIndex, props.itemList?.[activeIndex])
          props.onClick?.(e)
        }}
      >
        {props.itemList?.[activeIndex]}
      </View>
    ),
    [activeIndex]
  )
}
