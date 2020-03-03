import React, { ComponentProps } from 'react'
import { View } from '.'

function Header(props: ComponentProps<typeof View> & {}) {
  return <View {...props} $componentName='Header' />
}

export default React.memo(Header) as typeof Header
