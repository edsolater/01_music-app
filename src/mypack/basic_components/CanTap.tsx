import React from 'react'
import { ComponentRoot, __ComponentCanSwitchStatus } from '.'

function CanTap({ ...restProps }: React.ComponentProps<typeof ComponentRoot>) {
  return <ComponentRoot name='CanTap' {...restProps} />
}

export default React.memo(CanTap) as typeof CanTap
