import React, { ComponentProps } from 'react'
import './Button.scss'
import { View } from '.'

//TODO： 常规操作：定义各种按钮样式
export default function Button(
  props: ComponentProps<typeof View> & {
    /**
     * 按钮处于失效状态
     */
    disabled?: boolean
  },
) {
  return <View {...props} $componentName={['Button', { _disabled: props.disabled }]}></View>
}
