import React from 'react'
import { ComponentRoot, View } from '.'

/**
 * 只作为 "伪元素" 而存在，不视作一个组件
 */
function Header({
  isPseudo,
  ...restProps
}: React.ComponentProps<typeof View> & {
  isPseudo?: boolean
}) {
  return <ComponentRoot name={isPseudo ? '__Header' : 'Header'} {...restProps} />
}

export default React.memo(Header) as typeof Header
