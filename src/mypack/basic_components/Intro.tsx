import React from 'react'
import './Intro.scss'
import { ComponentRoot } from '.'

/**
 * 父元素不能定义overflow:hidden
 * 该子元素必须排在父元素的所有非Wrapper子元素之前
 */
const Intro = ({ ...restProps }: React.ComponentProps<typeof ComponentRoot>) => {
  return <ComponentRoot name='Intro' {...restProps} />
}

export default React.memo(Intro) as typeof Intro
