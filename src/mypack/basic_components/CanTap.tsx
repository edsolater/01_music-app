import React from 'react'
import { __ComponentCanTap, View, __ComponentCanSwitchStatus } from '.'

function CanTap({ ...restProps }: Omit<React.ComponentProps<typeof __ComponentCanTap>, 'componentName'>) {
  return <__ComponentCanTap componentName='CanTap' {...restProps} />
}

export default React.memo(CanTap) as typeof CanTap
