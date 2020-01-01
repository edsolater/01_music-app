import React from 'react'
import { View,  __ComponentCanSwitchStatus } from '.'

function CanTap({ ...restProps }: Omit<React.ComponentProps<typeof View>, 'extraClassName'>) {
  return <View extraClassName='CanTap' {...restProps} />
}

export default React.memo(CanTap) as typeof CanTap
