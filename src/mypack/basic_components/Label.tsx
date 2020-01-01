import React from 'react'

import './Label.less'
import { ComponentRoot } from '.'

export default function Label({
  text,
  ...restProps
}: React.ComponentProps<typeof ComponentRoot> & {
  text?: string
}) {
  return (
    <ComponentRoot name='Label' {...restProps}>
      {text ?? restProps.children}
    </ComponentRoot>
  )
}
