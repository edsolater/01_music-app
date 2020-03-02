import React from 'react'
import './LongText.scss'
import { View, ViewPropType, ViewProp } from '.'
import { pick } from '../utils'

/**
 * 父元素不能定义overflow:hidden
 * 该子元素必须排在父元素的所有非Wrapper子元素之前
 */
function LongText(props: ViewPropType) {
  return <View {...pick(props, ViewProp)} _componentName_='LongText' />
}

export default React.memo(LongText) as typeof LongText
