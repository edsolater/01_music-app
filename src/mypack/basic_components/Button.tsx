import React, { MouseEvent } from 'react'
import './Button.scss'
import { ComponentRoot } from '.'

//TODO： 常规操作：定义各种按钮样式
function Button({
  isOn,
  isOff,
  ...restProps
}: Omit<React.ComponentProps<typeof ComponentRoot>, 'onClick'> & {
  /**
   * 按钮关闭
   */
  isOn?: boolean
  /**
   * 按钮打开
   */
  isOff?: boolean
  onClick?: (event: MouseEvent, changeToNextMode?: () => any) => any
}) {
  return <ComponentRoot name={['Button', { on: isOn, off: isOff }]} {...restProps}></ComponentRoot>
}

export default React.memo(Button) as typeof Button

