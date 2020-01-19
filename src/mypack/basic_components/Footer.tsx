import React from 'react'
import { ComponentRoot } from '.'

/**
 * 只作为 "伪元素" 而存在，不视作一个组件
 */
function Footer({
  isPseudo,
  ...restProps
}: React.ComponentProps<typeof ComponentRoot> & {
  isPseudo?: boolean
}) {
  return <ComponentRoot name={isPseudo ? '__Footer' : 'Footer'} {...restProps} />
}

export default React.memo(Footer) as typeof Footer
