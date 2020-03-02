import React from 'react'
import './AppRoot.scss'
import { View} from '.'
import { ViewPropType } from './View'

/**
 * TODO：提供一些应用的根组件的“能力”
 */
function AppRoot(props: ViewPropType){
  return <View _componentName_='AppRoot' {...props} />
}

export default React.memo(AppRoot) as typeof AppRoot
