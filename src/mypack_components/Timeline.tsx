import React, { FC, ReactNode, useEffect, useState } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import { Slider } from '.'
import { GetWidgetHandler } from 'type_helper'

const Timeline: FC<{
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  LeftLabel?: ReactNode
  RightLabel?: ReactNode
  current?: number
  total?: number
} & JSX.IntrinsicElements['div']> = ({
  className,
  LeftLabel,
  RightLabel,
  current = 0,
  total = 100,
  ...restProps
}) => {
  const [currentSecond, setCurrentSecond] = useState(current)
  const widgetHandler: GetWidgetHandler<typeof Slider> = {
    change: {
      current: undefined
    }
  }
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (currentSecond >= total) {
        console.log("it's end")
      } else {
        widgetHandler.change &&
          widgetHandler.change.current &&
          widgetHandler.change.current(currentSecond + 1)
        setCurrentSecond(currentSecond + 1)
      }
    }, 1000)
    return () => clearTimeout(timeoutID)
  })
  return (
    <div className={classnames(className, 'Timeline')} {...restProps}>
      {LeftLabel && <div className="LeftLabel">{LeftLabel}</div>}
      {RightLabel && <div className="RightLabel">{RightLabel}</div>}
      <Slider
        defaultValue={currentSecond}
        total={total}
        onChangeCurrentByTrigger={currentSeconds => setCurrentSecond(currentSeconds)}
        widgetHandler={widgetHandler}
      />
    </div>
  )
}
export default Timeline
