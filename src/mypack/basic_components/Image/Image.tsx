import React from 'react'
import { ComponentBox } from '..'
import './Image.less'

function Image({
  src,
  alt,
  srcSet,
  ...restProps
}: React.ComponentProps<typeof ComponentBox> & {
  src?: string
  alt?: string
  srcSet?: string
}) {
  return (
    <ComponentBox componetName='Image' {...restProps}>
      <img src={src} alt={alt} srcSet={srcSet} />
    </ComponentBox>
  )
}

export default React.memo(Image) as typeof Image
