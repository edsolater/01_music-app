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
  Title?: ReactNode
  Timestamp?: ReactNode
  onChange?: (second: number) => void
}> = ({
  className,
  totalSeconds,
  currentSecond,
  onChange,

  Title,
  Timestamp,

  ...restProps
}) => {
  return (
    <div className={classnames(className, 'Timeline')} {...restProps}>
      {Title && <div className="Title">{Title}</div>}
      {Timestamp && <div className="Timestamp">{Timestamp}</div>}
      <Track
        value={currentSecond}
        total={totalSeconds}
        onChange={currentSeconds => onChange && onChange(currentSeconds)}
      />
    </div>
  )
}

export default Timeline
