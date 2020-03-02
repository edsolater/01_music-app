import React from 'react'
import { View, ViewPropType, ViewProp } from '.'
import { pick } from '../utils'

/**
 * 组织性的View，同Grid为非可见元素
 */
function Block(props: ViewPropType) {
  return <View {...pick(props, ViewProp)} _componentName_='Block' />
}

export default React.memo(Block) as typeof Block
