import React from 'react'
import { ComponentRoot } from '.'

function Header({ ...restProps }: React.ComponentProps<typeof ComponentRoot>) {
  return <ComponentRoot name='Header' {...restProps} />
}

export default React.memo(Header) as typeof Header
