import React from 'react'
import './LineIntroText.scss'
import { Text } from '.'

/**
 * 父元素不能定义overflow:hidden
 * 该子元素必须排在父元素的所有非Wrapper子元素之前
 */
const LineIntroText = ({ ...restProps }: React.ComponentProps<typeof Text>) => {
  return <Text name='LineIntroText' {...restProps} />
}

export default React.memo(LineIntroText) as typeof LineIntroText
