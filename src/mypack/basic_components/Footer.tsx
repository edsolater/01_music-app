import React from 'react'
import { ComponentRoot } from '.'

function Footer({ ...restProps }: React.ComponentProps<typeof ComponentRoot>) {
  return <ComponentRoot name='Footer' {...restProps} />
}

export default React.memo(Footer) as typeof Footer
