import React, { ComponentProps } from 'react'
import { View } from '.'

function Header({ ...restProps }: ComponentProps<typeof View>) {
  return <View $componentName='Header' {...restProps} />
}
export default Header
