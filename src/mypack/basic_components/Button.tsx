import React from 'react'
import './Button.scss'
import { View, ViewPropType, ViewProp } from '.'
import { pick } from '../utils'

//TODO： 常规操作：定义各种按钮样式
function Button(
  props: ViewPropType & {
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
    <View
      {...pick(props, ViewProp)/* TODO: 总是这个形式的调用，需要缓存机制 */}
      _componentName_={['Button', { _disabled: props.disabled, _on: props.isOn, _off: props.isOff }]}
    ></View>
  )
}

export default React.memo(Button) as typeof Button
