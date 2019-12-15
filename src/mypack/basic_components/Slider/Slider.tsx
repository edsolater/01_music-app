import React from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'

import './Slider.less'
import { useMaster } from '../__customHooks'
import { constraint } from '../../utils'
import { GetChildState, GetChildCommands } from '../types'

/**
 * 注意它只能理解数字
 */
function Slider({
  className,
  max = 1,
  value,
  defaultValue,
  childState,
  childCommands,
  onMoveTrigger,
  onMoveTriggerDone,
  ...restProps
}: JSX.IntrinsicElements['div'] & {
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  /**
   * 总长度
   */
  max?: number
  /**
   * 当前所在位置 (初始值)
   */
  defaultValue?: number
  /**
   * 当前所在位置
   */
  value?: number
  /**
   * 反应子组件的当前状态
   */
  childState?: {
    inDraggingTrigger?: boolean
  }
  /**
   * 对子组件的命令（如果设置的相应状态依赖父组件的状态，则无效）
   */
  childCommands?: {
    /**
     * 如果依赖父组件的value，则无效。
     * 如果处于正在拖拽的状态，则无效
     */
    setValue?: Function
  }

  /**
   * 只要拖动trigger的手柄就会触发这个事件，所以这个事件会触发多次
   */
  onMoveTrigger?: (currentSecond: number) => any
  /**
   * 只在最后触发一次
   */
  onMoveTriggerDone?: (currentSecond: number) => any
}) {
  const triggerLeft = useMaster({
    type: 'counter(percentage)',
    init: (value || defaultValue || 0) / max || 0,
  })
  const inDraggingTrigger = useMaster({ type: 'on-off-reporter' })
  const styleLeft = value
    ? `${(inDraggingTrigger.value ? triggerLeft.value : (value ?? 0) / max) * 100}%`
    : `${triggerLeft.value * 100}%`
  const setLeft = (percentage: number) => {
    triggerLeft.set(percentage)
  }

  //#region 上抛控制权
  if (childState)
    Object.assign(childState, {
      get inDraggingTrigger() {
        return inDraggingTrigger.value
      },
    } as GetChildState<typeof Slider>)
  if (childCommands)
    Object.assign(childCommands, {
      setValue: (current: number) => {
        if (value || inDraggingTrigger) return
        else setLeft(constraint(current / max, { range: [0, 1] }))
      },
    } as GetChildCommands<typeof Slider>)
  //#endregion

  /**
   * 移动 Trigger
   */
  const moveTrigger = (percentage: number) => {
    const validPercentage = constraint(percentage, { range: [0, 1] })
    setLeft(validPercentage)
    onMoveTrigger?.(validPercentage * max)
  }
  const moveTriggerDone = (percentage: number) => {
    const validPercentage = constraint(percentage, { range: [0, 1] })
    setLeft(validPercentage)
    onMoveTriggerDone?.(validPercentage * max)
  }
  return (
    <div
      className={classnames(className, 'Slider')}
      onClick={(e) => {
        const slider = (e.target as HTMLDivElement).parentElement!
        const { left: trackClientLeft, width: trackWidth } = slider.getBoundingClientRect()
        moveTriggerDone((e.clientX - trackClientLeft) / trackWidth)
      }}
      onWheel={(e) => {
        moveTriggerDone(triggerLeft.value + Math.sign(e.deltaY) * 0.1)
      }}
      {...restProps}
    >
      <div
        className='Trigger'
        onPointerDown={(e) => {
          const slider = ((e.target as Element).parentElement as HTMLDivElement)!
          const trigger = (slider.querySelector('.Trigger') as HTMLDivElement)!
          const passedTrack = (slider.querySelector('.PassedTrack') as HTMLDivElement)!
          trigger.style.transition = 'none'
          passedTrack.style.transition = 'none'
          const { left: sliderClientLeft, width: sliderWidth } = slider.getBoundingClientRect()
          /**
           * document 绑定拖拽事件
           */
          const moveHandler = (e) => {
            inDraggingTrigger.turnOn()
            moveTrigger((e.clientX - sliderClientLeft) / sliderWidth)
          }
          /**
           * 清理 document 上述事件
           */
          const handlerDone = (e) => {
            trigger.style.transition = ''
            passedTrack.style.transition = ''
            inDraggingTrigger.turnOff()
            moveTriggerDone((e.clientX - sliderClientLeft) / sliderWidth)
            document.removeEventListener('pointermove', moveHandler)
            document.removeEventListener('pointerup', handlerDone)
          }

          document.addEventListener('pointermove', moveHandler)
          document.addEventListener('pointerup', handlerDone)
        }}
        style={{
          left: styleLeft,
        }}
      />
      <div className='Track'>
        <div
          className='PassedTrack'
          style={{
            width: styleLeft,
          }}
        />
      </div>
    </div>
  )
}

export default React.memo(Slider) as typeof Slider
