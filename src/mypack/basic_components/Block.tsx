import React from 'react'
import { ComponentRoot, ComponentRootPorpType, componentRootProps } from '.'
import { pick } from '../utils'

/**
 * 组织性的View，同Grid为非可见元素
 */
function Block(props: ComponentRootPorpType) {
  return <ComponentRoot {...pick(props, componentRootProps)} name='Block' />
}

export default React.memo(Block) as typeof Block
