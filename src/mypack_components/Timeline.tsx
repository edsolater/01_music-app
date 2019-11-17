import React, { FC, ReactNode } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import { Slider } from '.'

const Timeline: FC<{
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  LeftLabel?: ReactNode
  RightLabel?: ReactNode
  currentProgress: number
} & JSX.IntrinsicElements['div']> = ({
  className,
  LeftLabel,
  RightLabel,
  currentProgress,
  ...restProps
}) => (
  <div className={classnames(className, 'Timeline')} {...restProps}>
    {LeftLabel && <div className="LeftLabel">{LeftLabel}</div>}
    {RightLabel && <div className="RightLabel">{RightLabel}</div>}
    <Slider></Slider>
  </div>
)
export default Timeline
