import React from 'react'
import { ComponentRoot } from '.'
import './Divider.scss'

/**
 * TODO: 目前只是个简单的横向分割线
 */
function Divider({
  ...restProps
}: React.ComponentProps<typeof ComponentRoot> & {
}) {
  return <ComponentRoot name='Divider' {...restProps} />
}

export default React.memo(Divider) as typeof Divider
