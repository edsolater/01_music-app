import React from 'react'
import { ComponentRoot, Image } from '.'
import './Icon.scss'

/**
 * TODO: 以后SVGIcon要动态的化不能简单地作为 img 处理 
 */
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
      {restProps.children}
      <Image src={src} alt={alt} srcSet={srcSet}  />
    </ComponentRoot>
  )
}

export default React.memo(Icon) as typeof Icon
