import React from 'react'
import './Section.scss'
import { ComponentRoot, ComponentRootPorpType, componentRootProps } from '.'
import { pick } from '../utils'

function Section(props: ComponentRootPorpType) {
  return <ComponentRoot {...pick(props, componentRootProps)} name='Section' />
}
export default React.memo(Section) as typeof Section
