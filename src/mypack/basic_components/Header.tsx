import React from 'react'
import { ComponentRoot } from '.'

function Header(props: React.ComponentProps<typeof ComponentRoot> & {}) {
  return <ComponentRoot name='Header' {...props} />
}

export default React.memo(Header) as typeof Header
