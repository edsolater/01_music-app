import React from 'react'
import { ComponentRoot, ComponentRootPorpType, componentRootProps } from '.'
import { pick } from '../utils'

function Footer(props: ComponentRootPorpType & {}) {
  return <ComponentRoot {...pick(props, componentRootProps)} name='Footer' />
}

export default React.memo(Footer) as typeof Footer
