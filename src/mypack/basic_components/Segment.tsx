import React from 'react'
import { Section, ComponentRootPorpType, componentRootProps } from '.'
import { pick } from '../utils'

function Segment<O>(props: ComponentRootPorpType<O>) {
  return <Section {...pick(props, componentRootProps)} className={[props.className, 'Segment']} />
}

export default React.memo(Segment) as typeof Segment
