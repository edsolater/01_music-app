import React from 'react'
import './Label.scss'
import { View, ViewPropType, ViewProp } from '.'
import { pick } from '../utils'

function Label(
  props: ViewPropType & {
    text?: string
  },
  ref
) {
  return (
    <View ref={ref} {...pick(props, ViewProp)} _componentName_='Label'>
      {props.text ?? props.children}
    </View>
  )
}

export default React.memo(React.forwardRef(Label)) as typeof Label
