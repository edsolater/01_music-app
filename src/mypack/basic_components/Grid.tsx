import React from 'react'
import { View, ViewPropType, ViewProp } from '.'
import { pick } from '../utils'


function Grid(props:ViewPropType) {
  return <View {...pick(props, ViewProp)} _componentName_='Grid'  />
}

export default React.memo(Grid) as typeof Grid
