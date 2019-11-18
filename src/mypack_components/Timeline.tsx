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
  /**
   * 只要拖动trigger的手柄就会触发这个事件，所以这个事件会触发多次
   */
  onChange?: (second: number) => void
  /**
   * 只在最后触发一次
   */
  onChangeDone?: (second: number) => any
}> = ({
  className,
  totalSeconds,
  currentSecond,
  onChange,
  onChangeDone,

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
        onChange={onChange}
        onChangeDone={onChangeDone}
      />
    </div>
  )
}

export default Timeline
