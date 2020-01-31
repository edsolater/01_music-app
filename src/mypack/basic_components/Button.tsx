import React from 'react'
import './Button.scss'
import { ComponentRoot, ComponentRootPorpType, componentRootProps } from '.'
import { pick } from '../utils'

//TODO： 常规操作：定义各种按钮样式
function Button<O>(
  props: ComponentRootPorpType<O> & {
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
  },
) {
  return (
    <ComponentRoot
      {...pick(props, componentRootProps)/* TODO: 总是这个形式的调用，需要缓存机制 */}
      name={['Button', { _disabled: props.disabled, _on: props.isOn, _off: props.isOff }]}
    ></ComponentRoot>
  )
}

export default React.memo(Button) as typeof Button
