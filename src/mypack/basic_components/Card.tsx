import React, { ComponentProps } from 'react'
import './Card.scss'
import { View,  } from '.'

/**
 * 目前只是个有特殊样式的DIV
 */
function Card(props: ComponentProps<typeof View>) {
  return <View {...props} _componentName_='Card' />
}

export default React.memo(Card) as typeof Card
