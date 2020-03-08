import React, { ComponentProps } from 'react'
import './OverlayedImage.scss'
import { View } from '../lower'

export default function OverlayedImage(
  props: ComponentProps<typeof View> & {
    /**
     * 代表盒子样式，默认为row的样式
     */
    type?: 'row' | 'col'
  },
) {
  return (
    <View {...props} $componentName={['OverlayedImage', props.type]}>
      {props.children}
    </View>
  )
}
