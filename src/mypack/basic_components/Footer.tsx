import React, { ComponentProps } from 'react'
import { View } from '.'

function Footer(props: ComponentProps<typeof View> & {}) {
  return <View {...props} _componentName_='Footer' />
}

export default React.memo(Footer) as typeof Footer
