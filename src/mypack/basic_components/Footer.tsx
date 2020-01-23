import React from 'react'
import { ComponentRoot } from '.'

function Footer(props: React.ComponentProps<typeof ComponentRoot> & {}) {
  return <ComponentRoot name='Footer' {...props} />
}

export default React.memo(Footer) as typeof Footer
