import React, { ComponentProps } from 'react'
import './Icon.scss'
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
      {...props}
      className={[
        props.className,
        'Icon',
        props.iconfontName && `${props.iconfontName} iconfont icon-${props.iconfontName}`
      ]}
    />
  ) : (
    <View
      style={{
        ...(props.style ?? {}),
        // @ts-ignore
        WebkitMaskImage: `url(${props.src})`,
        WebkitMaskSize: 'cover'
      }}
      originProps={{
        alt: props.alt,
        srcSet: props.srcSet,
        ...(props.originProps as JSX.IntrinsicElements['img'])
      }}
      className={[props.className, 'Icon']}
    />
  )
}
