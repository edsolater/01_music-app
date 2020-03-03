import React, { ComponentProps } from 'react'
import { Image, View } from '.'
import './ImageBox.scss'

function ImageBox(
  props: ComponentProps<typeof View> & {
    src?: string
    alt?: string
    srcSet?: string
  },
) {
  return (
    <View {...props} _componentName_='ImageBox'>
      {props.children}
      <Image
        src={props.src}
        html={{
          alt: props.alt,
          srcSet: props.srcSet,
        }}
      />
    </View>
  )
}

export default React.memo(ImageBox) as typeof ImageBox
