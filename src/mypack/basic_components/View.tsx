import React from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'

const View = React.forwardRef(
  <T extends keyof JSX.IntrinsicElements>(
    {
      className,
      use,
      ...restProps
    }: Omit<JSX.IntrinsicElements[T], 'className'> & {
      /**
       * 覆盖原生的className
       */
      className?: ClassValue
      /**
       * 表示渲染所使用的标签，默认使用DIV
       */
      use?: T
    },
    ref,
  ): JSX.Element => {
    return React.createElement(use ?? 'div', {
      className: classnames(className),
      ...Object.assign(restProps, { ref }),
    })
  },
)
export default React.memo(View) as typeof View
