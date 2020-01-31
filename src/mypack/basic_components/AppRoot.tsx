import React from 'react'
import './AppRoot.scss'
import { ComponentRoot } from '.'
import { ComponentRootPorpType } from './ComponentRoot'

/**
 * TODO：提供一些应用的根组件的“能力”
 */
function AppRoot<O>(props: ComponentRootPorpType<O>){
  return <ComponentRoot name='AppRoot' {...props} />
}

export default React.memo(AppRoot) as typeof AppRoot
