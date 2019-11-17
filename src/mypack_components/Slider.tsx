import React, { FC, useState } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'

import { attachWidgetHandlers } from './__myComponentUtil'
import { constraint } from '../mypack_utils'
import { useToggableState } from './__myHooks'

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
  const [styleLeft, setStyleLeft] = useState((value || defaultValue || 0) / total)
  const inDragging = useToggableState(false)
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
          return inDragging.state
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
        className="Trigger"
        onMouseDown={e => {
          inDragging.on()
          const track = (e.target as HTMLDivElement).parentElement!.getElementsByClassName(
            'Track'
          )[0] as HTMLDivElement
          const { left: trackClientLeft, width: trackWidth } = track.getBoundingClientRect()
          /**
           * 给 document 鼠标移动执行的事件
           */
          const moveTrigger = (e: MouseEvent) => {
            const currentTriggerInUI = (e.clientX - trackClientLeft) / trackWidth
            setPercentage(currentTriggerInUI)
            if (onChangeTrigger)
              onChangeTrigger(Math.round(constraint(currentTriggerInUI, { range: [0, 1] }) * total))
          }
          /**
           * 清理 document 上述事件
           */
          const clearTriggerFunction = () => {
            inDragging.off()
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
      <div className="Track" />
    </div>
  )
}
export default Slider
