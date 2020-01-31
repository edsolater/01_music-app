import React from 'react'
import './Divider.scss'
import { ComponentRoot, ComponentRootPorpType, componentRootProps } from '.'
import { pick } from '../utils'

/**
 * TODO: 目前只是个简单的横向分割线
 */
function Divider<O>(props: ComponentRootPorpType<O> & {}) {
  return <ComponentRoot {...pick(props, componentRootProps)} name='Divider' />
}

export default React.memo(Divider) as typeof Divider
