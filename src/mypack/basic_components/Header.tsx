import React from 'react'
import { ComponentRoot, ComponentRootPorpType, componentRootProps } from '.'
import { pick } from '../utils'

function Header<O>(props: ComponentRootPorpType<O> & {}) {
  return <ComponentRoot {...pick(props, componentRootProps)} name='Header'  />
}

export default React.memo(Header) as typeof Header
