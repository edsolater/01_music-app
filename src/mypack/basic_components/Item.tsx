import React from 'react'
import { View } from '.'

/**
 * 用于横向布局
 */
function Item({ className, ...restProps }: React.ComponentProps<typeof View>) {
  return <View className={[className, 'Item']} {...restProps} />
}

export default React.memo(Item) as typeof Item
