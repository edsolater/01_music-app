import React, { ComponentProps } from 'react'
import './Picture.scss'
import { View } from '../lower'

export default function Picture(
  props: ComponentProps<typeof View> & {
    /**
     * 代表盒子样式，默认为row的样式
     */
    type?: 'row' | 'col'
  },
) {
  return (
    <View {...props} $componentName={['Picture', props.type]}>
      {props.children}
    </View>
  )
}
