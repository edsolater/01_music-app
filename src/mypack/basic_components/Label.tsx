import React from 'react'
import './Label.scss'
import { ComponentRoot, ComponentRootPorpType, componentRootProps } from '.'
import { pick } from '../utils'

function Label<O>(
  props: ComponentRootPorpType<O> & {
    text?: string
  },
  ref
) {
  return (
    <ComponentRoot ref={ref} {...pick(props, componentRootProps)} name='Label'>
      {props.text ?? props.children}
    </ComponentRoot>
  )
}

export default React.memo(React.forwardRef(Label)) as typeof Label
