import React from 'react'
import { Image, ComponentRoot, ComponentRootPorpType, componentRootProps } from '.'
import { pick } from '../utils'
import './ImageBox.scss'

function ImageBox(
  props: ComponentRootPorpType & {
    src?: string
    alt?: string
    srcSet?: string
  },
) {
  return (
    <ComponentRoot {...pick(props, componentRootProps)} name='ImageBox'>
      {props.children}
      <Image
        src={props.src}
        html={{
          alt: props.alt,
          srcSet: props.srcSet,
        }}
      />
    </ComponentRoot>
  )
}

export default React.memo(ImageBox) as typeof ImageBox
