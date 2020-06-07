import React, { ComponentProps } from 'react'
import './Figure.scss'
import View from './View'

export default function Figure(
  props: ComponentProps<typeof View> & {
    /**
     * 代表盒子样式，默认为row的样式
     */
    type?: 'row' | 'col'
  }
) {
  return (
    <View {...props} $componentName={['Figure', props.type]}>
      {props.children}
    </View>
  )
}
