import React from 'react'
import ComponentName from '../ComponentName/ComponentName'

function __CanTap({ ...restProps }: React.ComponentProps<typeof ComponentName>) {
  return <ComponentName {...restProps} />
}
export default React.memo(__CanTap) as typeof __CanTap
