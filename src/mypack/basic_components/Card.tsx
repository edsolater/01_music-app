import React from 'react'
import './Card.scss'
import { View, ViewPropType, ViewProp } from '.'
import { pick } from '../utils'

/**
 * 目前只是个有特殊样式的DIV
 */
function Card(
  props: ViewPropType & {
    // src?: string
    // alt?: string
    // srcSet?: string
  },
) {
  return <View {...pick(props, ViewProp)} _componentName_='Card' />
}

export default React.memo(Card) as typeof Card
