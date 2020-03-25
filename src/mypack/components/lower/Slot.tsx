import React, { ComponentProps } from 'react'
import { View } from '.'
import { mergeObjects } from 'mypack/utils/UObject'

export default function Slot(props: ComponentProps<typeof View> & {}) {
  if (React.isValidElement(props.children)) {
    //FIXME： 这里的合并简单粗暴，需要有个更非破坏性的浅合并方法
    return React.cloneElement(
      props.children,
      mergeObjects(props.children.props, props as { [key: string]: unknown }),
      props.children.props.children,
    )
  } else {
    return null
  }
}
