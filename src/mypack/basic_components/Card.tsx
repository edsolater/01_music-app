import React from 'react'
import './Card.scss'
import { ComponentRoot, ComponentRootPorpType, componentRootProps } from '.'
import { pick } from '../utils'

/**
 * 目前只是个有特殊样式的DIV
 */
function Card(
  props: ComponentRootPorpType & {
    // src?: string
    // alt?: string
    // srcSet?: string
  },
) {
  return <ComponentRoot {...pick(props, componentRootProps)} name='Card' />
}

export default React.memo(Card) as typeof Card
