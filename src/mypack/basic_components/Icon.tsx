import React from 'react'
import './Icon.scss'
import { Image, View, ViewPropType, ViewProp } from '.'
import { pick } from '../utils'

/**
 * TODO: 以后SVGIcon要动态的化不能简单地作为 img 处理
 */
function Icon(
  props: ViewPropType & {
    iconfontName?: IconfontName
    src?: string
    alt?: string
    srcSet?: string
  },
) {
  return (
    <View {...pick(props, ViewProp)} _componentName_={['Icon', props.iconfontName]}>
      {props.children}
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

export default React.memo(Icon) as typeof Icon
