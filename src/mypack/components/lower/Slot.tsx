import React, { ComponentProps } from 'react'
import { View } from '.'
import { mergeObjects } from 'mypack/utils/UObject'

export default function Slot(props: ComponentProps<typeof View> & {}) {
  if (React.isValidElement(props.children)) {
    return React.cloneElement(
      props.children,
      mergeObjects(props.children.props, props as { [key: string]: unknown }),
      props.children.props.children,
    )
  } else {
    return null
  }
}
