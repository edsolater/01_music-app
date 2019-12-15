import React from 'react'

import './Label.less'
import { View, ComponentBox } from '..'

export default function Label({
  text,
  ...restProps
}: React.ComponentProps<typeof View> & {
  text?: string
}) {
  return (
    <ComponentBox componentClassName='Label' {...restProps}>
      {text ?? restProps.children}
    </ComponentBox>
  )
}
