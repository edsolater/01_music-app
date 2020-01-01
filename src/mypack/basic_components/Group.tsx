import React from 'react'
import './Group.less'
import { ComponentRoot } from '.'

function Group({ ...restProps }: React.ComponentProps<typeof ComponentRoot>) {
  return <ComponentRoot name='Group' {...restProps} />
}
export default React.memo(Group) as typeof Group
