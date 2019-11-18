import React, { FC, ReactNode } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import { Track } from '.'

export const Timeline: FC<JSX.IntrinsicElements['div'] & {
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  LeftLabel?: ReactNode
  RightLabel?: ReactNode
  /**
   * 总共秒数
   */
  totalSeconds: number
  /**
   * 已完成的秒数
   */
  currentSecond?: number
  /**
   * 是否是正在播放的状态
   */
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
        onChangeTrigger={currentSeconds => onChange && onChange(currentSeconds)}
      />
    </div>
  )
}

export default Timeline
