import React from 'react'
import { ComponentRoot, Image } from '.'
import './ImageBox.scss'

function ImageBox({
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
    <ComponentRoot name='ImageBox' {...restProps}>
      <Image src={src} alt={alt} srcSet={srcSet} />
    </ComponentRoot>
  )
}

export default React.memo(ImageBox) as typeof ImageBox
