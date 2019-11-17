import React, { FC } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'

const ButtonGroup: FC<{
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
} & JSX.IntrinsicElements['div']> = ({ className, ...restProps }) => (
  <div className={classnames(className, 'ButtonGroup')} {...restProps}></div>
)
export default ButtonGroup
