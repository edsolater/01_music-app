import React, { FC, ReactNode } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import './index.css'
export const Button: FC<{
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  Text?: ReactNode
} & JSX.IntrinsicElements['div']> = ({ className, Text, ...restProps }) => (
  <div className={classnames(className, 'Button')} {...restProps}>
    {Text && <div className="Text">{Text}</div>}
  </div>
)
export default Button
