import React from 'react'
import { ComponentName, __ComponentCanSwitchStatus } from '.'

function CanTap({ ...restProps }: React.ComponentProps<typeof ComponentName>) {
  return <ComponentName name='CanTap' {...restProps} />
}

export default React.memo(CanTap) as typeof CanTap
