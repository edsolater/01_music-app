import React, { ComponentProps } from 'react'
import './Icon.scss'
import { Image, View } from '..'

export default function Icon(
  props: ComponentProps<typeof View> & {
    iconfontName?: IconfontName
    src?: string
    alt?: string
    srcSet?: string
  },
) {
  return (
    <>
      {props.iconfontName ? (
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
          {...props}
          src={props.src}
          html={{
            alt: props.alt,
            srcSet: props.srcSet,
            ...(props.html as JSX.IntrinsicElements['img']),
          }}
        />
      )}
    </>
  )
}
