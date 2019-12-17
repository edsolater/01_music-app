import React from 'react'
import ComponentBox from '../ComponentBox/ComponentBox'
import './Group.less'

function Group({
  ...restProps
}: Omit<React.ComponentProps<typeof ComponentBox>, 'componentClassName'>) {
  return <ComponentBox componetName='Group' {...restProps} />
}
export default React.memo(Group) as typeof Group
