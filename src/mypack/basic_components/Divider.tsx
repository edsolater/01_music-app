import React, { ComponentProps } from 'react'
import './Divider.scss'
import { View,  } from '.'

/**
 * TODO: 目前只是个简单的横向分割线
 */
function Divider(props: ComponentProps<typeof View> & {}) {
  return <View {...props} _componentName_='Divider' />
}

export default React.memo(Divider) as typeof Divider
