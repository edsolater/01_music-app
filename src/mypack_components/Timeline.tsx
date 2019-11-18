import React, { FC, ReactNode, useEffect, useState } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import { Track } from '.'

export const Timeline: FC<{
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  LeftLabel?: ReactNode
  RightLabel?: ReactNode
  /**
   * 初始秒数（一般为0，即不设置）
   */
  initSecond?: number
  /**
   * 总共秒数
   */
  total: number
  /**
   * 是否是正在播放的状态
   */
  isPlaying?: boolean
} & JSX.IntrinsicElements['div']> = ({
  className,
  LeftLabel,
  RightLabel,
  initSecond = 0,
  total,
  isPlaying = true,
  ...restProps
}) => {
  const [currentSecond, setCurrentSecond] = useState(initSecond)
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (isPlaying) {
        if (currentSecond >= total) {
          console.log("it's end")
        } else {
          setCurrentSecond(currentSecond + 1)
        }
      }
    }, 1000)
    // 以此把UI的控制权交给react，而不是Dom
    return () => clearTimeout(timeoutID)
  })
  return (
    <div className={classnames(className, 'Timeline')} {...restProps}>
      {LeftLabel && <div className="LeftLabel">{LeftLabel}</div>}
      {RightLabel && <div className="RightLabel">{RightLabel}</div>}
      <Track
        value={currentSecond}
        total={total}
        onChangeTrigger={currentSeconds => setCurrentSecond(currentSeconds)}
      />
    </div>
  )
}

