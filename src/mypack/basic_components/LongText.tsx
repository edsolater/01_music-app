import React from 'react'
import './LongText.scss'
import { ComponentRoot } from '.'

/**
 * 父元素不能定义overflow:hidden
 * 该子元素必须排在父元素的所有非Wrapper子元素之前
 */
const LongText = ({ ...restProps }: React.ComponentProps<typeof ComponentRoot>) => {
  return <ComponentRoot name='LongText' {...restProps} />
}

export default React.memo(LongText) as typeof LongText
