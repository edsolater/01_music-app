import React, { ComponentProps } from 'react'
import './Icon.scss'
import Image from './Image'
import View from './View'

export default function Icon(
  props: ComponentProps<typeof View> & {
    iconfontName?: IconfontName
    src?: string
    alt?: string
    srcSet?: string
  }
) {
  return props.iconfontName ? (
    <View
      as='i'
      $componentName={[
        'Icon',
        props.iconfontName && `${props.iconfontName} iconfont icon-${props.iconfontName}`
      ]}
      {...props}
    />
  ) : (
    <Image
      $componentName='Icon'
      src={props.src}
      {...props}
      html={{
        alt: props.alt,
        srcSet: props.srcSet,
        ...(props.html as JSX.IntrinsicElements['img'])
      }}
    />
  )
}
