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
    <View {...props} $componentName={['Icon', props.iconfontName]}>
      {props.iconfontName ? (
        <View className={['iconfont', `icon-${props.iconfontName}`]} />
      ) : (
        <Image
          src={props.src}
          html={{
            alt: props.alt,
            srcSet: props.srcSet,
          }}
        />
      )}
    </View>
  )
}
