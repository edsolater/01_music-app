import React, { ComponentProps } from 'react'
import './Item.scss'
import { View } from '.'

export default function Item(props: ComponentProps<typeof View> & {}) {
  return <View {...props} $componentName='Item' as='li' />
}
