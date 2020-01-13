import React from 'react'
import { View } from '.'

function Footer({ className, ...restProps }: React.ComponentProps<typeof View>) {
  return <View className={[className, 'Footer']} {...restProps} />
}

export default React.memo(Footer) as typeof Footer
