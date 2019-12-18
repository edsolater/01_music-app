import React from 'react'

import './Label.less'
import { View, ComponentName } from '..'

export default function Label({
  text,
  ...restProps
}: React.ComponentProps<typeof View> & {
  text?: string
}) {
  return (
    <ComponentName displayComponentName='Label' {...restProps}>
      {text ?? restProps.children}
    </ComponentName>
  )
}
