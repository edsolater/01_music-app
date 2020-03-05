import React, { ComponentProps } from 'react'
import { View } from '.'

export default function Item(props: ComponentProps<typeof View>) {
  return <View {...props} $componentName='Item' />
}
