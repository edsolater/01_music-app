import React from 'react'
import ComponentName from '../ComponentName/ComponentName'

function Can_tap({ ...restProps }: React.ComponentProps<typeof ComponentName>) {
  return <ComponentName {...restProps} />
}
export default React.memo(Can_tap) as typeof Can_tap
