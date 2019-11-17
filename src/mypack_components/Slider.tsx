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
    /**
     * 移动 Trigger
     */
    const moveTrigger = (percentage:number) => {
      setPercentage(percentage)
      if (onChangeTrigger)
        onChangeTrigger(Math.round(constraint(percentage, { range: [0, 1] }) * total))
    }
  return (
    <div className={classnames(className, 'Slider')} onClick={(e) => {
      const track = (e.target as HTMLDivElement)
      const { left: trackClientLeft, width: trackWidth } = track.getBoundingClientRect()
      moveTrigger((e.clientX - trackClientLeft) / trackWidth)
    }} {...restProps}>
      <div
        className="Trigger"
        onPointerDown={e => {
          const track = (e.target as HTMLDivElement).parentElement!.getElementsByClassName(
            'Track'
          )[0] as HTMLDivElement
          const { left: trackClientLeft, width: trackWidth } = track.getBoundingClientRect()
          /**
           * document 绑定拖拽事件 
           */
          const moveHandler = e => {
            inDragging.on()
            moveTrigger((e.clientX - trackClientLeft) / trackWidth)
          }
          /**
           * 清理 document 上述事件
           */
          const clearMoveHandler = () => {
            inDragging.off()
            document.removeEventListener('pointermove', moveHandler)
            document.removeEventListener('pointerup', clearMoveHandler)
          }

          document.addEventListener('pointermove', moveHandler)
          document.addEventListener('pointerup', clearMoveHandler)
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
