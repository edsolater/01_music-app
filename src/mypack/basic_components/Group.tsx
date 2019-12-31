import React from 'react'
import './Group.less'
import { ComponentName } from '.'

function Group({
  ...restProps
}: Omit<React.ComponentProps<typeof ComponentName>, 'displayComponentName'>) {
  return <ComponentName componentName='Group' {...restProps} />
}
export default React.memo(Group) as typeof Group
