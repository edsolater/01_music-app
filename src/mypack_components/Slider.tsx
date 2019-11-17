import React, { FC, useRef, useState } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import { attachWidgetHandlers } from './__myComponentUtil'
import { constraint } from '../mypack_utils'

const Slider: FC<{
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  /**
   * 总长度
   */
  total: number
  /**
   * 当前所在位置 (初始值)
   */
  defaultValue?: number
  /**
   * 当前所在位置
   */
  value?: number
  /**
   * 上抛控制用函数
   */
  widgetHandler?: {
    state: {
      inDragging?: boolean
    }
    action: {
      setCurrent?: Function
    }
  }
  onChangeTrigger?: (current: number) => any
} & JSX.IntrinsicElements['div']> = ({
  className,
  total = 100,
  value,
  defaultValue,
  widgetHandler,
  onChangeTrigger,
  ...restProps
}) => {
  const sliderTriggerRef = useRef(null)
  const [inDragging, setInDragging] = useState(false)
  const [styleLeft, setStyleLeft] = useState((value || defaultValue || 0) / total)
  const setPercentage = (percentage: number) => {
    if (value) return
    setStyleLeft(constraint(percentage, { range: [0, 1] }))
  }
  // 上抛控制权 widgetHandler
  if (widgetHandler)
    attachWidgetHandlers(widgetHandler, {
      state: {
        // 指示说父级想要看时能看到当前子组件的状态，但不能监听，数据的所属权在于子组件
        get inDragging() {
          return inDragging
        }
      },
      action: {
        setCurrent: (current: number) => {
          if (inDragging) return
          else setPercentage(current / total)
        }
      }
    })
  return (
    <div className={classnames(className, 'Slider')} {...restProps}>
      <div
        className="SliderTrigger"
        ref={sliderTriggerRef}
        onMouseDown={() => {
          setInDragging(true)
          const trigger = (sliderTriggerRef.current as unknown) as HTMLDivElement
          const slider = trigger.parentElement!
          /**
           * 给 document 鼠标移动执行的事件
           */
          const moveTrigger = (e: MouseEvent) => {
            const currentTriggerInUI = (e.clientX - slider.offsetLeft) / slider.offsetWidth
            setPercentage(currentTriggerInUI)
            if (onChangeTrigger) onChangeTrigger(Math.round(currentTriggerInUI * total))
          }
          /**
           * 清理 document 上述事件
           */
          const clearTriggerFunction = () => {
            setInDragging(false)
            document.removeEventListener('mousemove', moveTrigger)
            document.removeEventListener('mouseup', clearTriggerFunction)
          }

          document.addEventListener('mousemove', moveTrigger)
          document.addEventListener('mouseup', clearTriggerFunction)
        }}
        style={{
          left: `${(value ? value / total : styleLeft) * 100}%`
        }}
      />
      <div className="SliderTrack" />
    </div>
  )
}
export default Slider
