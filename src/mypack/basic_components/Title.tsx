import React from 'react'
import './Title.scss'
import { View, ViewPropType, ViewProp } from '.'
import { pick } from '../utils'

/**
 * @deprecated
 * 已废弃，文字都使用 <Text>
 */
function Title(props: ViewPropType) {
  return <View {...pick(props, ViewProp)} _componentName_='Title' />
}

export default React.memo(Title) as typeof Title
