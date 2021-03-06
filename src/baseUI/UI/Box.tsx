import React, { ComponentProps } from 'react'
import './Box.scss'
import View from './View'

// FIXME deprecated 需要额外的记忆成本，不好，不要用

export default function Box(
  props: ComponentProps<typeof View> & {
    /**间隙的大小 */
    gapSize?: 'normal' | 'large' | 'small' | 'none'
    /**方向 */
    direction?: 'row' | 'col'
  }
) {
  return (
    <View {...props} className={[props.className, props.direction, props.gapSize]}>
      {props.children}
    </View>
  )
}
