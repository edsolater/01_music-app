import React from 'react'
import ComponentBox from '../ComponentBox/ComponentBox'
import './Group.less'

function Group({
  ...restProps
}: Omit<React.ComponentProps<typeof ComponentBox>, 'componentClassName'>) {
  return <ComponentBox componentName='Group' {...restProps}></ComponentBox>
}

export default React.memo(Group) as typeof Group
