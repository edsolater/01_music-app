import React from 'react'
import ComponentName from '../ComponentName/ComponentName'

function __ComponentCanTap({ ...restProps }: React.ComponentProps<typeof ComponentName>) {
  return <ComponentName {...restProps} />
}
export default React.memo(__ComponentCanTap) as typeof __ComponentCanTap
