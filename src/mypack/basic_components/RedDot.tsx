import React from 'react'
import './RedDot.scss'
import { ComponentRoot, Slot, Text } from '.'

/**
 * 父元素不能定义overflow:hidden
 * 该子元素必须排在父元素的所有非Wrapper子元素之前
 */
const RedDot = ({
  amount,
  invisiable,
  onlyDot,
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
  /**
   * 只显示红点而不显示数字
   */
  onlyDot?: boolean
}) => {
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
      <Slot slotName={['RedDot__Dot', { _onlyDot: onlyDot }]}>{!onlyDot && <Text>{amount}</Text>}</Slot>
    </ComponentRoot>
  )
}

export default React.memo(RedDot) as typeof RedDot
