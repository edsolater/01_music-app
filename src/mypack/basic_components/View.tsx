import React from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'

const View = React.forwardRef(
  <T extends keyof JSX.IntrinsicElements>(
    props: Omit<JSX.IntrinsicElements[T], 'className'> & {
      /**
       * 覆盖原生的className
       */
      className?: ClassValue
      /**
       * 表示渲染所使用的标签，默认使用DIV
       */
      use?: T
      /**
       * 类似于 vue 的 v-if 反义（如果怎么怎么样，就隐藏）
       */
      hideif?: any
    },
    ref,
  ): JSX.Element | null => {
    if (Boolean(props.hideif)) return null
    const { className, use, hideif, ...restProps } = props
    return React.createElement(props.use ?? 'div', {
      className: classnames(props.className),
      ...Object.assign(restProps, { ref }),
    })
  },
)
View.displayName = 'View'
export default React.memo(View) as typeof View
