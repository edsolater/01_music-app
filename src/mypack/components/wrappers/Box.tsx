import React, { ComponentProps } from 'react'
import './Box.scss'
import { View } from '.'

export default function Box(
  props: ComponentProps<typeof View> & {
    /**间隙的大小 */
    gapSize?: 'normal' | 'large' | 'small' | 'none'
    /**方向 */
    direction?: 'row' | 'col'
  },
) {
  return (
    <View {...props} $componentName={[props.direction, props.gapSize]}>
      {props.children}
    </View>
  )
}
