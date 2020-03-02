import React, { ComponentProps } from 'react'
import './Button.scss'
import { View,  } from '.'

//TODO： 常规操作：定义各种按钮样式
function Button(
  props: ComponentProps<typeof View> & {
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
      {...props}
      _componentName_={['Button', { _disabled: props.disabled, _on: props.isOn, _off: props.isOff }]}
    ></View>
  )
}

export default React.memo(Button) as typeof Button
