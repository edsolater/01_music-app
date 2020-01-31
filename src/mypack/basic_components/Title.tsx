import React from 'react'
import './Title.scss'
import { ComponentRoot, ComponentRootPorpType, componentRootProps } from '.'
import { pick } from '../utils'

/**
 * @deprecated
 * 已废弃，文字都使用 <Text>
 */
function Title<O>(props: ComponentRootPorpType<O>) {
  return <ComponentRoot {...pick(props, componentRootProps)} name='Title' />
}

export default React.memo(Title) as typeof Title
