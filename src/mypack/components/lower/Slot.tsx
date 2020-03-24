import React, { ComponentProps } from 'react'
import { View } from '.'

export default function Slot(props: ComponentProps<typeof View> & {}) {
  if (React.isValidElement(props.children)) {
    return React.cloneElement(props.children, { ...props, ...props.children.props })
  } else {
    return null
  }
}
