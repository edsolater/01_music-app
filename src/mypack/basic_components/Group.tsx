import React from 'react'
import './Group.less'
import { View } from '.'

function Group({ ...restProps }: Omit<React.ComponentProps<typeof View>, 'displayView'>) {
  return <View extraClassName='Group' {...restProps} />
}
export default React.memo(Group) as typeof Group
