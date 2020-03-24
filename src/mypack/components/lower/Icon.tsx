import React, { ComponentProps } from 'react'
import './Icon.scss'
import { Image, View } from '.'
import { IconfontName } from 'iconfont/namelist'

export default function Icon(
  props: ComponentProps<typeof View> & {
    iconfontName?: IconfontName
    src?: string
    alt?: string
    srcSet?: string
  },
) {
  console.log('props: ', props)
  return props.iconfontName ? (
    <View
      $tag='i'
      $componentName={[
        'Icon',
        props.iconfontName && `${props.iconfontName} iconfont icon-${props.iconfontName}`,
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
        ...(props.html as JSX.IntrinsicElements['img']),
      }}
    />
  )
}
