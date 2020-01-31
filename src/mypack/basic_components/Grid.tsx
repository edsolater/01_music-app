import React from 'react'
import { ComponentRoot, ComponentRootPorpType, componentRootProps } from '.'
import { pick } from '../utils'


function Grid<O>(props:ComponentRootPorpType<O>) {
  return <ComponentRoot {...pick(props, componentRootProps)} name='Grid'  />
}

export default React.memo(Grid) as typeof Grid
