import React, { FC, ReactNode } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
export const Image: FC<{
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
} & JSX.IntrinsicElements['img']> = ({ className, ...restProps }) => (
  <img className={classnames(className, 'Image')} {...restProps} />
)

export default Image
