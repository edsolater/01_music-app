import React, { MouseEvent, useRef, useEffect } from 'react'
import './RedDot.scss'
import { ComponentRoot, View, Slot,Text } from '.'

/**
 * 父元素不能定义overflow:hidden
 * 该子元素必须排在父元素的所有非Wrapper子元素之前
 */
function RedDot({
  amount,
  ...restProps
}: React.ComponentProps<typeof ComponentRoot> & {
  /**
   * 红点上显式的数量
   */
  amount?: number | string
}) {

  //TODO : force ref
  const measureParentBox = (element: HTMLDivElement) => {
    console.log('element: ', element)
  }
  return (
    <ComponentRoot ref={measureParentBox} name='RedDot' {...restProps}>
      <Slot name='__Dot'><Text>{amount}</Text></Slot>
    </ComponentRoot>
  )
}

export default React.memo(RedDot) as typeof RedDot
