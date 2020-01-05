import React, { CSSProperties } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'

function View({
  className,
  ...restProps
}: Omit<JSX.IntrinsicElements['div'], 'className'> & {
  className?: ClassValue
}) {
  return (
    <div
      className={classnames(className)}
      {...restProps}
    />
  )
}
export default React.memo(View) as typeof View
