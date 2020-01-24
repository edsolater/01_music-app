import React from 'react'
import { ComponentRoot } from '.'

/**
 * 组织性的View，同Grid为非可见元素
 */
function Block(props: React.ComponentProps<typeof ComponentRoot> & {}) {
  return <ComponentRoot name='Block' {...props} />
}

export default React.memo(Block) as typeof Block
