import React from 'react'
import { __ComponentCanSwitchStatus } from '.'

function CanSwitchStatus({
  ...restProps
}: Omit<React.ComponentProps<typeof __ComponentCanSwitchStatus>, 'componentName'>) {
  return <__ComponentCanSwitchStatus componentName='CanSwitchStatus' {...restProps} />
}

export default React.memo(CanSwitchStatus) as typeof CanSwitchStatus
