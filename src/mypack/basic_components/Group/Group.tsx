import React from 'react'
import ComponentName from '../ComponentName/ComponentName'
import './Group.less'

function Group({
  ...restProps
}: Omit<React.ComponentProps<typeof ComponentName>, 'componentClassName'>) {
  return <ComponentName displayName='Group' {...restProps} />
}
export default React.memo(Group) as typeof Group
