import React, { ComponentProps } from 'react'
import './Box.scss'
import { View } from '.'

export default function Box(
  props: ComponentProps<typeof View> & {
    /**
     * 代表盒子样式，默认为row的样式
     */
    type?: 'row' | 'col'
  },
) {
  return (
    <View {...props} $componentName={['Box', props.type]}>
      {props.children}
    </View>
  )
}
