import React, { ComponentProps, ReactNode } from 'react'
import './Button.scss'
import { View } from '.'

//TODO： 常规操作：定义各种按钮样式
export default function Button(
  props: ComponentProps<typeof View> & {
    /** 按钮处于失效状态 */
    disabled?: boolean
    /** 加上边框 */
    styleType?: 'has-border'
    /** 按钮的大小 */
    size?: 'small' | 'large'
    /** icon位置渲染 */
    renderIcon?: ReactNode
  },
) {
  return (
    <View
      as='button'
      $componentName={[
        'Button',
        {
          _disabled: props.disabled,
          _hasBorder: props.styleType === 'has-border',
          _small: props.size === 'small',
          _large: props.size === 'large',
        },
      ]}
      {...props}
      html={
        {
          type: 'button',
          ...props.html,
        } as any
      }
    />
  )
}
