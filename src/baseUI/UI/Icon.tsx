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
      {...props}
      className={[
        props.className,
        'Icon',
        props.iconfontName && `${props.iconfontName} iconfont icon-${props.iconfontName}`
      ]}
    />
  ) : (
    <Image
      style={{ ...(props.style ?? {}), mask: `url(${props.src})` }}
      html={{
        alt: props.alt,
        srcSet: props.srcSet,
        ...(props.html as JSX.IntrinsicElements['img'])
      }}
      className={[props.className, 'Icon']}
    />
  )
}
