import React, { ComponentProps } from 'react'
import './Label.scss'
import { View } from '.'

function Label(
  props: ComponentProps<typeof View> & {
    text?: string
  },
  ref,
) {
  return (
    <View ref={ref} {...props} $componentName='Label'>
      {props.text ?? props.children}
    </View>
  )
}

export default React.memo(React.forwardRef(Label)) as typeof Label
