import React from 'react'
import { ComponentRoot } from '.'

function Section({ ...restProps }: React.ComponentProps<typeof ComponentRoot>) {
  return <ComponentRoot name='Section' {...restProps} />
}

export default React.memo(Section) as typeof Section
