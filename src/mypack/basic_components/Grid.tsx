import React from 'react'
import { ComponentRoot } from '.'


function Grid({ ...restProps }: React.ComponentProps<typeof ComponentRoot>) {
  return <ComponentRoot name='Grid' {...restProps} />
}

export default React.memo(Grid) as typeof Grid
