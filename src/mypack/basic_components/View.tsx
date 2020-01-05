import React, { CSSProperties } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'

function View({
  className,
  style,
  extraStyle,
  extraClassName,
  ...restProps
}: Omit<JSX.IntrinsicElements['div'], 'className'> & {
  className?: ClassValue
  /**
   * 额外的 className
   */
  extraClassName?: ClassValue
  /**
   * 额外的 style 
   */
  extraStyle?: CSSProperties
}) {
  return (
    <div
      style={{ ...style, ...extraStyle }}
      className={classnames(className, extraClassName)}
      {...restProps}
    />
  )
}
export default React.memo(View) as typeof View
