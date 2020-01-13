import React from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'

function Section({
  className,
  ...restProps
}: Omit<JSX.IntrinsicElements['section'], 'className'> & {
  className?: ClassValue
}) {
  return <section className={classnames(className)} {...restProps} />
}
export default React.memo(Section) as typeof Section
