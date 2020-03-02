import React from 'react'
import { View, ViewPropType, ViewProp } from '.'
import { pick } from '../utils'

function Header(props: ViewPropType & {}) {
  return <View {...pick(props, ViewProp)} _componentName_='Header'  />
}

export default React.memo(Header) as typeof Header
