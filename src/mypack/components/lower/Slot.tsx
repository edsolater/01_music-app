import React, { ComponentProps } from 'react'
import { View } from '.'

export default function Slot(props: ComponentProps<typeof View> & {}) {
  if (React.isValidElement(props.children)) {
    //FIXME： 这里的合并简单粗暴，需要有个更非破坏性的浅合并方法
    return React.cloneElement(
      props.children,
      { ...props.children.props, ...props },
      props.children.props.children,
    )
  } else {
    return null
  }
}
