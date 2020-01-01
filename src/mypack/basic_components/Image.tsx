import React from 'react'
import { View } from '.'
import './Image.less'

function Image({
  src,
  alt,
  srcSet,
  ...restProps
}: React.ComponentProps<typeof View> & {
  src?: string
  alt?: string
  srcSet?: string
}) {
  return (
    <View extraClassName='Image' {...restProps}>
      <img src={src} alt={alt} srcSet={srcSet} />
    </View>
  )
}

export default React.memo(Image) as typeof Image
