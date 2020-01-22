import React from 'react'
import { ComponentRoot } from '.'
import './BigTitle.scss'

function BigTitle({ ...restProps }: React.ComponentProps<typeof ComponentRoot>) {
  return <ComponentRoot name='BigTitle' {...restProps} />
}

export default React.memo(BigTitle) as typeof BigTitle
