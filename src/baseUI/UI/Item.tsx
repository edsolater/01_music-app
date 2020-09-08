import React, { ComponentProps } from 'react'
import View from './View'

export default function Item(props: ComponentProps<typeof View> & {}) {
  return <View {...props} className={[props.className, 'Item']} as='li' />
}
