import React from 'react'
import { Image, ComponentRoot, ComponentRootPorpType, componentRootProps } from '.'
import './Avatar.scss'
import { pick } from '../utils'

function Avatar<O>(
  props: ComponentRootPorpType<O> & {
    src?: string
  },
) {
  return (
    <ComponentRoot {...pick(props, componentRootProps)} name='Avatar'>
      <Image src={props.src} />
    </ComponentRoot>
  )
}

export default React.memo(Avatar) as typeof Avatar
