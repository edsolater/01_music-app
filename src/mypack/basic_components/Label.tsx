import React from 'react'

import './Label.less'
import { View } from '.'

export default function Label({
  text,
  ...restProps
}: React.ComponentProps<typeof View> & {
  text?: string
}) {
  return (
    <View extraClassName='Label' {...restProps}>
      {text ?? restProps.children}
    </View>
  )
}
