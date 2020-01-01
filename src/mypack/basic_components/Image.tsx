import React from 'react'
import { ComponentRoot } from '.'
import './Image.less'

function Image({
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
    <ComponentRoot name='Image' {...restProps}>
      <img src={src} alt={alt} srcSet={srcSet} />
    </ComponentRoot>
  )
}

export default React.memo(Image) as typeof Image
