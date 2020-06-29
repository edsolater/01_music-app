import React, { ComponentProps, ReactNode, useMemo, useEffect, useState } from 'react'
import { exist } from 'functions/judger'
import { mergeCallbacks } from 'functions/reactComponent'
import View from './View'
import Button from './Button'

/**
 *  循环切换
 */
export default function Togger(
  props: ComponentProps<typeof View> & {
    /**只是展示，没有交互 */
    justShow?: boolean
    active?: boolean
    /**初始时的激活，默认第一项false */
    initActive?: boolean
    /**切换序列 */
    trusyNode?: ReactNode
    falsyNode?: ReactNode
    /**
     * 序号改变时的回调
     */
    onToggle?: (active: boolean, node: ReactNode | undefined) => void
  }
) {
  // 这种组件本身有状态，父级也有状态能影响它的设计模式，UI非常快速响应
  const [active, setActive] = useState(props.initActive ?? props.active ?? false)
  useEffect(() => {
    if (exist(props.active)) {
      setActive(props.active)
    }
  }, [props.active])

  return useMemo(
    () => (
      <Button
        {...props}
        className={[props.className, 'Togger']}
        onClick={mergeCallbacks([
          () => {
            if (!props.justShow) setActive(s => !s)
            props.onToggle?.(active, active ? props.trusyNode : props.falsyNode)
          },
          props.onClick
        ])}
      >
        {active ? props.trusyNode : props.falsyNode}
      </Button>
    ),
    [active]
  )
}
