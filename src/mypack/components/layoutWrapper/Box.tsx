import React, { ComponentProps } from 'react'
import './Box.scss'
import { View } from '../basicElements'

export default function Box(
  props: ComponentProps<typeof View> & {
    /**间隙的大小 */
    gapSize?: 'normal' | 'large' | 'small' | 'none'
  },
) {
  return (
    <View {...props} $componentName={['Box', props.gapSize]}>
      {props.children}
    </View>
  )
}
