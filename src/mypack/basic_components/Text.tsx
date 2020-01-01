import React from 'react'
import { ComponentName } from '.'

function Text({ ...restProps }: React.ComponentProps<typeof ComponentName> & {}) {
  return <ComponentName name='Text' {...restProps} />
}

export default React.memo(Text) as typeof Text
