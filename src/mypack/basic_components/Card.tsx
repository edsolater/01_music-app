import React from 'react'
import { ComponentRoot } from '.'
import './Card.scss'

/**
 * 目前只是个有特殊样式的DIV
 */
function Card({
  ...restProps
}: React.ComponentProps<typeof ComponentRoot> & {
  // src?: string
  // alt?: string
  // srcSet?: string
}) {
  return <ComponentRoot name='Card' {...restProps} />
}

export default React.memo(Card) as typeof Card
