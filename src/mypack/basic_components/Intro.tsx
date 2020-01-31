import React from 'react'
import './Intro.scss'
import { ComponentRoot, ComponentRootPorpType, componentRootProps } from '.'
import { pick } from '../utils'

function Intro<O>(props: ComponentRootPorpType<O>) {
  return <ComponentRoot {...pick(props, componentRootProps)} name='Intro' />
}

export default React.memo(Intro) as typeof Intro
