import React from 'react'
import './Intro.scss'
import { View, ViewPropType, ViewProp } from '.'
import { pick } from '../utils'

function Intro(props: ViewPropType) {
  return <View {...pick(props, ViewProp)} _componentName_='Intro' />
}

export default React.memo(Intro) as typeof Intro
