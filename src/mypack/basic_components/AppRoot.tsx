import React from 'react'
import './AppRoot.scss'
import { ComponentRoot } from '.'

/**
 * TODO：提供一些应用的根组件的“能力”
 */
const AppRoot = ({ ...restProps }: React.ComponentProps<typeof ComponentRoot>) => {
  return <ComponentRoot name='AppRoot' {...restProps} />
}

export default React.memo(AppRoot) as typeof AppRoot
