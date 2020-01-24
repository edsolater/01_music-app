import React from 'react'
import './Button.scss'
import { ComponentRoot } from '.'

//TODO： 常规操作：定义各种按钮样式
function Button({
  isOn,
  isOff,
  disabled,
  ...restProps
}: React.ComponentProps<typeof ComponentRoot> & {
  /**
   * 按钮关闭
   */
  isOn?: boolean
  /**
   * 按钮打开
   */
  isOff?: boolean
  /**
   * 按钮处于失效状态
   */
  disabled?: boolean
}) {
  return (
    <ComponentRoot
      name={['Button', { _disabled: disabled, _on: isOn, _off: isOff }]}
      {...restProps}
    ></ComponentRoot>
  )
}

export default React.memo(Button) as typeof Button
