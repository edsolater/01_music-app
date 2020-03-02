import React, { ComponentProps } from 'react'
import { View,  } from '.'

/**
 * 用于横向布局
 */
function Item(
  props: ComponentProps<typeof View> & {
    hello?: string
  },
  ref: any,
) {
  return (
    <View
      ref={ref}
      {...props}
      className={[props.className, 'Item']}
    />
  )
}

export default React.memo(React.forwardRef(Item)) as typeof Item
