import React from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'

function View({
  className,
  use = 'div',
  ...restProps
}: Omit<JSX.IntrinsicElements['div'], 'className'> & {
  /**
   * 覆盖原生的className
   */
  className?: ClassValue
  /**
   * 表示渲染所使用的标签，默认使用DIV
   */
  use?: keyof JSX.IntrinsicElements
}): JSX.Element {
  return React.createElement(use, {
    className: classnames(className),
    ...restProps,
  })
}
export default React.memo(View) as typeof View
