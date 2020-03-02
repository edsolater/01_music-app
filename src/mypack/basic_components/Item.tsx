import React from 'react'
import { View, ViewPropType, ViewProp } from '.'
import { pick } from '../utils'

/**
 * 用于横向布局
 */
function Item(
  props: ViewPropType & {
    hello?: string
  },
  ref: any,
) {
  return (
    <View
      ref={ref}
      {...pick(props, ViewProp)}
      className={[props.className, 'Item']}
    />
  )
}

export default React.memo(React.forwardRef(Item)) as typeof Item
