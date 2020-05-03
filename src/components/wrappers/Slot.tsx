import React, { ComponentProps } from 'react'
import { View } from '.'
import mergeObjects from 'utils/mergeObject'

/**
 * 并不实际渲染在DOM中，用于合并属性的
 */
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
