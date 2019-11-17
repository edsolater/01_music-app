import React, { FC, ReactNode, useEffect, useState } from 'react'
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
  initSecond?: number
  total: number
} & JSX.IntrinsicElements['div']> = ({
  className,
  LeftLabel,
  RightLabel,
  initSecond = 0,
  total = 100,
  ...restProps
}) => {
  const [currentSecond, setCurrentSecond] = useState(initSecond)
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (currentSecond >= total) {
        console.log("it's end")
      } else {
        setCurrentSecond(currentSecond + 1)
      }
    }, 1000)
    // 以此把UI的控制权交给react，而不是Dom
    return () => clearTimeout(timeoutID)
  })
  return (
    <div className={classnames(className, 'Timeline')} {...restProps}>
      {LeftLabel && <div className="LeftLabel">{LeftLabel}</div>}
      {RightLabel && <div className="RightLabel">{RightLabel}</div>}
      <Slider
        value={currentSecond}
        total={total}
        onChangeTrigger={currentSeconds => setCurrentSecond(currentSeconds)}
      />
    </div>
  )
}
export default Timeline
