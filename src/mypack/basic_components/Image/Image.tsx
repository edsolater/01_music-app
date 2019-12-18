import React from 'react'
import { ComponentName } from '..'
import './Image.less'

function Image({
  src,
  alt,
  srcSet,
  ...restProps
}: React.ComponentProps<typeof ComponentName> & {
  src?: string
  alt?: string
  srcSet?: string
}) {
  return (
    <ComponentName displayComponentName='Image' {...restProps}>
      <img src={src} alt={alt} srcSet={srcSet} />
    </ComponentName>
  )
}

export default React.memo(Image) as typeof Image
