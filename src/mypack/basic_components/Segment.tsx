import React from 'react'
import { Section, ViewPropType, ViewProp } from '.'
import { pick } from '../utils'

function Segment(props: ViewPropType) {
  return <Section {...pick(props, ViewProp)} className={[props.className, 'Segment']} />
}

export default React.memo(Segment) as typeof Segment
