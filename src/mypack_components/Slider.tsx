import React, { FC, useRef, useState } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import { attachWidgetHandlers } from './__myComponentUtil'

const Slider: FC<{
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  /**
   * 总长度
   */
  total?: number
  /**
   * 当前所在位置
   */
  defaultValue?: number
  onChangeCurrentByTrigger?: Function
  widgetHandler?: {
    change?: {
      current?: Function
    }
  }
} & JSX.IntrinsicElements['div']> = ({
  className,
  total = 100,
  defaultValue = 0,
  widgetHandler,
  onChangeCurrentByTrigger,
  ...restProps
}) => {
  const sliderTriggerRef = useRef(null)
  const [isDragged, setIsDragged] = useState(false)
  const [styleLeft, setStyleLeft] = useState(`${(defaultValue / total) * 100}%`)
  const setCurrentPercentage = (percentage: number) => {
    if (percentage < 0) {
      percentage = 0
    } else if (percentage > 1) {
      percentage = 1
    }
    setStyleLeft(`${percentage * 100}%`)
  }
  // 上抛控制权 widgetHandler
  attachWidgetHandlers(widgetHandler, {
    change: {
      current: (seconds: number) => {
        if (isDragged) return
        else setCurrentPercentage(seconds / total)
      }
    }
  })
  return (
    <div className={classnames(className, 'Slider')} {...restProps}>
      <div
        className="SliderTrigger"
        ref={sliderTriggerRef}
        onMouseDown={() => {
          setIsDragged(true)
          const trigger = (sliderTriggerRef.current as unknown) as HTMLDivElement
          const slider = trigger.parentElement!
          /**
           * 给 document 鼠标移动执行的事件
           */
          const moveTrigger = (e: MouseEvent) => {
            const current = (e.clientX - slider.offsetLeft) / slider.offsetWidth
            setCurrentPercentage(current)
            if (onChangeCurrentByTrigger) onChangeCurrentByTrigger(Math.round(current * total))
          }
          /**
           * 清理 document 上述事件
           */
          const clearTriggerFunction = () => {
            setIsDragged(false)
            document.removeEventListener('mousemove', moveTrigger)
            document.removeEventListener('mouseup', clearTriggerFunction)
          }

          document.addEventListener('mousemove', moveTrigger)
          document.addEventListener('mouseup', clearTriggerFunction)
        }}
        style={{
          left: styleLeft
        }}
      />
      <div className="SliderTrack" />
    </div>
  )
}
export default Slider
