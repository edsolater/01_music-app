import React, { ComponentProps, ReactNode, useMemo, useEffect, useState } from 'react'
import { View } from '.'
import { exist } from 'utils/judger'

/**
 *  2种状态的node切换
 */
export default function Cycle(
  props: ComponentProps<typeof View> & {
    active?: number
    /**初始时激活的序号，index，默认第一项 */
    initActive?: number
    /**切换序列 */
    nodeList?: ReactNode[]
    /**
     * 序号改变时的回调
     */
    onChange?: (active: number, node: ReactNode | undefined) => void
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
          setActiveIndex(n => (n + 1) % (props.nodeList?.length ?? NaN))
          props.onChange?.(activeIndex, props.nodeList?.[activeIndex])
          props.onClick?.(e)
        }}
      >
        {props.nodeList?.[activeIndex]}
      </View>
    ),
    [activeIndex]
  )
}
