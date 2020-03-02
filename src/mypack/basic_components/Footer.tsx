import React from 'react'
import { View, ViewPropType, ViewProp } from '.'
import { pick } from '../utils'

function Footer(props: ViewPropType & {}) {
  return <View {...pick(props, ViewProp)} _componentName_='Footer' />
}

export default React.memo(Footer) as typeof Footer
