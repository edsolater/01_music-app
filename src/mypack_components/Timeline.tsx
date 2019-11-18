import React, { FC, ReactNode } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import { Track } from '.'

export const Timeline: FC<JSX.IntrinsicElements['div'] & {
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  /**
   * 总共秒数
   */
  totalSeconds: number
  /**
   * 已完成的秒数
   */
  currentSecond?: number
  LeftLabel?: ReactNode
  RightLabel?: ReactNode
  onChange?: (second: number) => void
}> = ({
  className,
  totalSeconds,
  currentSecond,
  onChange,

  LeftLabel,
  RightLabel,

  ...restProps
}) => {
  return (
    <div className={classnames(className, 'Timeline')} {...restProps}>
      {LeftLabel && <div className="LeftLabel">{LeftLabel}</div>}
      {RightLabel && <div className="RightLabel">{RightLabel}</div>}
      <Track
        value={currentSecond}
        total={totalSeconds}
        onChange={currentSeconds => onChange && onChange(currentSeconds)}
      />
    </div>
  )
}

export default Timeline
