import React from 'react'
import './Section.scss'
import { View, ViewPropType, ViewProp } from '.'
import { pick } from '../utils'

function Section(props: ViewPropType) {
  return <View {...pick(props, ViewProp)} _componentName_='Section' />
}
export default React.memo(Section) as typeof Section
