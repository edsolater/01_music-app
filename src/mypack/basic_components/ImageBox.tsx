import React from 'react'
import { Image, View, ViewPropType, ViewProp } from '.'
import { pick } from '../utils'
import './ImageBox.scss'

function ImageBox(
  props: ViewPropType & {
    src?: string
    alt?: string
    srcSet?: string
  },
) {
  return (
    <View {...pick(props, ViewProp)} _componentName_='ImageBox'>
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
