import React, { FC } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
const Slider: FC<{
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
} & JSX.IntrinsicElements['div']> = ({ className, ...restProps }) => (
  <div className={classnames(className, 'Slider')} {...restProps}>
    <div className="SliderTrack" />
    <div className="SliderTrigger" />
  </div>
)
export default Slider

