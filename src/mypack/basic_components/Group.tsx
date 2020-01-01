import React from 'react'
import './Group.less'
import { ComponentName } from '.'

function Group({ ...restProps }: React.ComponentProps<typeof ComponentName>) {
  return <ComponentName name='Group' {...restProps} />
}
export default React.memo(Group) as typeof Group
