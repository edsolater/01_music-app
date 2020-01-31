import React from 'react'
import { View, propofView } from '.'
import { pick } from 'mypack/utils'

/**
 * 用于横向布局
 */
function Item(props: React.ComponentProps<typeof View>) {
  return <View {...pick(props, propofView)} className={[props.className, 'Item']} />
}

export default React.memo(Item)
