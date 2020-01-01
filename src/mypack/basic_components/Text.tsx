import React from 'react'
import { ComponentRoot } from '.'

function Text({ ...restProps }: React.ComponentProps<typeof ComponentRoot> & {}) {
  return <ComponentRoot name='Text' {...restProps} />
}

export default React.memo(Text) as typeof Text
