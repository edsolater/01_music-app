import React from 'react'
import { ComponentRoot, Image } from '.'
import './Avatar.scss'

function Avatar({
  src,
  ...restProps
}: React.ComponentProps<typeof ComponentRoot> & {
  src?: string
}) {
  return (
    <ComponentRoot name='Avatar' {...restProps}>
      <Image src={src} />
    </ComponentRoot>
  )
}

export default React.memo(Avatar) as typeof Avatar
