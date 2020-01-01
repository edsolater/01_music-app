import React from 'react'
import { __ComponentCanSwitchStatus } from '.'

function CanSwitchStatus({
  ...restProps
}: Omit<React.ComponentProps<typeof __ComponentCanSwitchStatus>, 'extraClassName'>) {
  return <__ComponentCanSwitchStatus extraClassName='CanSwitchStatus' {...restProps} />
}

export default React.memo(CanSwitchStatus) as typeof CanSwitchStatus
