import React from 'react'
import './RedDot.scss'
import { ComponentRoot, Slot, Text } from '.'

/**
 * 父元素不能定义overflow:hidden
 * 该子元素必须排在父元素的所有非Wrapper子元素之前
 */
function RedDot({
  amount,
  invisiable,
  ...restProps
}: React.ComponentProps<typeof ComponentRoot> & {
  /**
   * 红点上显式的数量
   */
  amount?: number | string
  /**
   * 像没有一样
   */
  invisiable?: boolean
}) {
  const addParentClass = (element: HTMLDivElement) => {
    globalThis.setTimeout(() => {
      element.parentElement?.classList.add('_hasRedDot')
    })
  }
  return (
    <ComponentRoot
      ref={addParentClass}
      name={['RedDot', { _invisiable: invisiable }]}
      {...restProps}
    >
      <Slot name='__Dot'>
        <Text>{amount}</Text>
      </Slot>
    </ComponentRoot>
  )
}

export default React.memo(RedDot) as typeof RedDot
