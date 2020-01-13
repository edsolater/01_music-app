import React from 'react'
import { Section } from '.'

function Segment({ className, ...restProps }: React.ComponentProps<typeof Section>) {
  return <Section className={[className, 'Segment']} {...restProps} />
}

export default React.memo(Segment) as typeof Segment
