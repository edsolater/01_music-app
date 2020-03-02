import React from 'react'
import './Icon.scss'
import { Image, ComponentRoot, ComponentRootPorpType, componentRootProps, View } from '.'
import { pick } from '../utils'

/**
 * TODO: 以后SVGIcon要动态的化不能简单地作为 img 处理
 */
function Icon(
  props: ComponentRootPorpType & {
    iconfontName?: IconfontName
    src?: string
    alt?: string
    srcSet?: string
  },
) {
  return (
    <ComponentRoot {...pick(props, componentRootProps)} name={['Icon', props.iconfontName]}>
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
    </ComponentRoot>
  )
}

export default React.memo(Icon) as typeof Icon
