import React, { ComponentProps } from 'react'
import './LongText.scss'
import { View } from '.'

/**
 * 父元素不能定义overflow:hidden
 * 该子元素必须排在父元素的所有非Wrapper子元素之前
 */
function LongText(props: ComponentProps<typeof View>) {
  return <View {...props} _componentName_='LongText' />
}

export default React.memo(LongText) as typeof LongText
