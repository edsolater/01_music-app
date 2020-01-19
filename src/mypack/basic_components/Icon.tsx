import React from 'react'
import { ComponentRoot, Image } from '.'
import './Icon.scss'

function Icon({
  src,
  alt,
  srcSet,
  iconName,
  ...restProps
}: React.ComponentProps<typeof ComponentRoot> & {
  src?: string
  alt?: string
  srcSet?: string
  iconName?: string
}) {
  return (
    <ComponentRoot name={['Icon',iconName]} {...restProps}>
      <Image src={src} alt={alt} srcSet={srcSet}  />
    </ComponentRoot>
  )
}

export default React.memo(Icon) as typeof Icon
