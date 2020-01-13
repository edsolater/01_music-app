import React from 'react'
import { View } from '.'

function Header({ className, ...restProps }: React.ComponentProps<typeof View>) {
  return <View className={[className, 'Header']} {...restProps} />
}

export default React.memo(Header) as typeof Header
