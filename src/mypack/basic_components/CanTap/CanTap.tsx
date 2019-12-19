import React from 'react'
import { __CanTap, View } from '..'

function CanTap({ ...restProps }: React.ComponentProps<typeof View>) {
  return <__CanTap displayComponentName='CanTap' {...restProps} />
}

export default React.memo(CanTap) as typeof CanTap
