import React from 'react'
import { ComponentRoot } from '.'

function Item({ ...restProps }: React.ComponentProps<typeof ComponentRoot>) {
  return <ComponentRoot name='Item' {...restProps} />
}

export default React.memo(Item) as typeof Item