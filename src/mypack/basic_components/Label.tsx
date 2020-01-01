import React from 'react'

import './Label.less'
import { ComponentName } from '.'

export default function Label({
  text,
  ...restProps
}: React.ComponentProps<typeof ComponentName> & {
  text?: string
}) {
  return (
    <ComponentName name='Label' {...restProps}>
      {text ?? restProps.children}
    </ComponentName>
  )
}
