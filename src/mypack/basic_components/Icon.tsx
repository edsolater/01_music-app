import React from 'react'
import './Icon.scss'
import { Image, ComponentRoot, ComponentRootPorpType, componentRootProps } from '.'
import { pick } from '../utils'

/**
 * TODO: 以后SVGIcon要动态的化不能简单地作为 img 处理
 */
function Icon<O>(
  props: ComponentRootPorpType<O> & {
    src?: string
    alt?: string
    srcSet?: string
    iconName?: string
  },
) {
  return (
    <ComponentRoot {...pick(props, componentRootProps)} name={['Icon', props.iconName]}>
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

export default React.memo(Icon) as typeof Icon
