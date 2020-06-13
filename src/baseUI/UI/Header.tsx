import React, { ComponentProps } from 'react'
import View from './View'

function Header({ ...restProps }: ComponentProps<typeof View>) {
  return <View {...restProps} className={[restProps.className, 'Header']} />
}
export default Header
