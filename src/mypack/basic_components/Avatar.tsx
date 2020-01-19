import React from 'react'
import { ComponentRoot, Image } from '.'
import './Avatar.scss'

function Avatar({
  src,
  alt,
  srcSet,
  ...restProps
}: React.ComponentProps<typeof ComponentRoot> & {
  src?: string
  alt?: string
  srcSet?: string
}) {
  return (
    <ComponentRoot name='Avatar' {...restProps}>
      <Image src={src} alt={alt} srcSet={srcSet}  />
    </ComponentRoot>
  )
}

export default React.memo(Avatar) as typeof Avatar
