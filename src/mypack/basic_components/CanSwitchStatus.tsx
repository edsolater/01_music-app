import React from 'react'
import { __ComponentCanSwitchStatus } from '.'

function CanSwitchStatus({
  ...restProps
}: Omit<React.ComponentProps<typeof __ComponentCanSwitchStatus>, 'className'>) {
  return <__ComponentCanSwitchStatus className='CanSwitchStatus' {...restProps} />
}

export default React.memo(CanSwitchStatus) as typeof CanSwitchStatus
