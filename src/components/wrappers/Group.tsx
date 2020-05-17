import React, { ComponentProps } from 'react'
import './Group.scss'
import { View } from '.'

export default function Group(
  props: ComponentProps<typeof View> & {
    /**间隙的大小 */
    gapSize?: 'normal' | 'large' | 'small' | 'none'
  },
) {
  return (
    <View {...props} $componentName={['Group', props.gapSize]}>
      {props.children}
    </View>
  )
}