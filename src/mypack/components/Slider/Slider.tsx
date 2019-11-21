import React, { FC, useState } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'

import './Slider.css'
import { useStateRecorder } from '../__customHooks'
import { constraint } from '../../utils'

/**
 * 注意它只能理解数字
 */
export const Slider: FC<{
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  /**
   * 总长度
   */
  total?: number
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
    state?: {
      inDragging?: boolean
    }
    action?: {
      setCurrent?: Function
    }
  }
  /**
   * 只要拖动trigger的手柄就会触发这个事件，所以这个事件会触发多次
   */
  onChange?: (currentSecond: number) => any
  /**
   * 只在最后触发一次
   */
  onChangeDone?: (currentSecond: number) => any
} & Omit<JSX.IntrinsicElements['div'], 'onChange'>> = ({
  className,
  total = 1,
  value,
  defaultValue,
  widgetHandler,
  onChange,
  onChangeDone,
  ...restProps
}) => {
  const [styleLeft, setStyleLeft] = useState((value || defaultValue || 0) / total || 0)
  const inDragging = useStateRecorder({ type: 'on-off-reporter' })
  const setPercentage = (percentage: number) => {
    if (value) return
    setStyleLeft(constraint(percentage, { range: [0, 1] }))
  }
  // 上抛控制权 widgetHandler
  if (widgetHandler)
    Object.assign(widgetHandler, {
      state: {
        // 指示说父级想要看时能看到当前子组件的状态，但不能监听，数据的所属权在于子组件
        get inDragging() {
          return inDragging.value
        },
      },
      action: {
        setCurrent: (current: number) => {
          if (inDragging) return
          else setPercentage(current / total)
        },
      },
    })
  /**
   * 移动 Trigger
   */
  const moveTrigger = (percentage: number) => {
    setPercentage(percentage)
    if (onChange) onChange(Math.round(constraint(percentage, { range: [0, 1] }) * total))
  }
  const moveTriggerDone = (percentage: number) => {
    setPercentage(percentage)
    if (onChangeDone) onChangeDone(Math.round(constraint(percentage, { range: [0, 1] }) * total))
  }
  return (
    <div
      className={classnames(className, 'Slider')}
      onClick={(e) => {
        const slider = (e.target as HTMLDivElement).parentElement!
        const { left: trackClientLeft, width: trackWidth } = slider.getBoundingClientRect()
        moveTriggerDone((e.clientX - trackClientLeft) / trackWidth)
      }}
      {...restProps}
    >
      <div
        className="Trigger"
        onPointerDown={(e) => {
          const slider = ((e.target as Element).parentElement as HTMLDivElement)!
          const trigger = (slider.querySelector('.Trigger') as HTMLDivElement)!
          const passedTrack = (slider.querySelector('.PassedTrack') as HTMLDivElement)!
          trigger.style.transition = 'none'
          passedTrack.style.transition = 'none'
          const { left: trackClientLeft, width: trackWidth } = slider.getBoundingClientRect()
          /**
           * document 绑定拖拽事件
           */
          const moveHandler = (e) => {
            inDragging.turnOn()
            moveTrigger((e.clientX - trackClientLeft) / trackWidth)
          }
          /**
           * 清理 document 上述事件
           */
          const handlerDone = (e) => {
            trigger.style.transition = ''
            passedTrack.style.transition = ''
            inDragging.turnOff()
            moveTriggerDone((e.clientX - trackClientLeft) / trackWidth)
            document.removeEventListener('pointermove', moveHandler)
            document.removeEventListener('pointerup', handlerDone)
          }

          document.addEventListener('pointermove', moveHandler)
          document.addEventListener('pointerup', handlerDone)
        }}
        style={{
          left: `${(value ? value / total : styleLeft) * 100}%`,
        }}
      />
      <div className="Track">
        <div
          className="PassedTrack"
          style={{ width: `${(value ? value / total : styleLeft) * 100}%` }}
        />
      </div>
    </div>
  )
}

export default Slider
