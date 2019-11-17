import React, { FC, ReactNode } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
const Button: FC<{
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  Content?: ReactNode
} & JSX.IntrinsicElements['div']> = ({ className, Content, ...restProps }) => (
  <div className={classnames(className, 'Button')} {...restProps}>
    {Content && <div className="ButtonContent">{Content}</div>}
  </div>
)
export default Button
