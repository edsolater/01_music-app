import React from 'react'
import { ComponentRoot } from '.'
import './Title.scss'

function Title({ ...restProps }: React.ComponentProps<typeof ComponentRoot>) {
  return <ComponentRoot name='Title' {...restProps} />
}

export default React.memo(Title) as typeof Title
