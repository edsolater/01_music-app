import React from 'react'
import { ComponentRoot } from '.'
import './List.scss'


function List({ ...restProps }: React.ComponentProps<typeof ComponentRoot>) {
  return <ComponentRoot name='List' {...restProps} />
}

export default React.memo(List) as typeof List
