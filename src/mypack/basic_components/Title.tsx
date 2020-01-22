import React from 'react'
import { ComponentRoot } from '.'
import './Title.scss'

/**
 * @deprecated
 * 已废弃，文字都使用 <Text>
 */
function Title({ ...restProps }: React.ComponentProps<typeof ComponentRoot>) {
  return <ComponentRoot name='Title' {...restProps} />
}

export default React.memo(Title) as typeof Title
