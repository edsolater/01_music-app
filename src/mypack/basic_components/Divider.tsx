import React from 'react'
import './Divider.scss'
import { View, ViewPropType, ViewProp } from '.'
import { pick } from '../utils'

/**
 * TODO: 目前只是个简单的横向分割线
 */
function Divider(props: ViewPropType & {}) {
  return <View {...pick(props, ViewProp)} _componentName_='Divider' />
}

export default React.memo(Divider) as typeof Divider
