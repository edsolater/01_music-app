import React, { FC, ReactNode } from 'react'
import * as classnames from 'classnames'
const Button: FC<{
  /**
   * 更具体的className
   */
  className?:
    | string
    | {
        [className: string]: boolean
      }
  Content?: ReactNode
} & JSX.IntrinsicElements['div']> = ({ className, Content, ...restProps }) => (
  <div className={classnames(className, 'Button')} {...restProps}>
    {Content && <div className="ButtonContent">{Content}</div>}
  </div>
)
export default Button
