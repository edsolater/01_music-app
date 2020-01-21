import React from 'react'
import './Intro.scss'
import { ComponentRoot } from '.'

const Intro = ({ ...restProps }: React.ComponentProps<typeof ComponentRoot>) => {
  return <ComponentRoot name='Intro' {...restProps} />
}

export default React.memo(Intro) as typeof Intro
