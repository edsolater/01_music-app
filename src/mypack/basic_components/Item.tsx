import React from 'react'
import { ComponentRoot, ComponentRootPorpType, componentRootProps } from '.'
import { pick } from '../utils'

/**
 * 用于横向布局
 */
function Item(
  props: ComponentRootPorpType & {
    hello?: string
  },
  ref: any,
) {
  return (
    <ComponentRoot
      ref={ref}
      {...pick(props, componentRootProps)}
      className={[props.className, 'Item']}
    />
  )
}

export default React.memo(React.forwardRef(Item)) as typeof Item
