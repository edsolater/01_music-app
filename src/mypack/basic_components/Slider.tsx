import React from 'react'

import './Slider.scss'
import { useMaster } from './customHooks'
import { View,ViewPropType, ViewProp } from '.'
import { pick } from '../utils'
import { UGuard } from 'mypack/utils/UGuard'

/**
 * TODO: 这个Slider会导致两次触发onMoveTriggerDone（click事件、PointerUp事件分别会触发一次）IDEA： 加个函数防抖能轻松解决？
 * TODO：此组件的 逻辑过于混乱，要重写
 * 注意它只能理解数字
 */
function Slider(
  props: ViewPropType & {
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
     * 只要拖动trigger的手柄就会触发这个事件，所以这个事件会触发多次
     */
    onMoveTrigger?: (currentSecond: number) => any
    /**
     * 只在最后触发一次
     */
    onMoveTriggerDone?: (currentSecond: number) => any
  },
) {
  const maxValue = props.max ?? 1
  const triggerLeft = useMaster({
    type: 'number',
    init: (props.value || props.defaultValue || 0) / maxValue || 0,
  })
  const inDraggingTrigger = useMaster({ type: 'boolean' })
  const styleLeft = props.value
    ? `${(inDraggingTrigger.getValue() ? triggerLeft.getValue() : (props.value ?? 0) / maxValue) *
        100}%`
    : `${triggerLeft.getValue() * 100}%`
  const setLeft = (percentage: number) => {
    triggerLeft.set(percentage)
  }

  /**
   * 移动 Trigger
   */
  const moveTrigger = (percentage: number) => {
    const validPercentage = UGuard.number(percentage, { range: [0, 1] })
    setLeft(validPercentage)
    props.onMoveTrigger?.(validPercentage * maxValue)
  }
  const moveTriggerDone = (percentage: number) => {
    const validPercentage = UGuard.number(percentage, { range: [0, 1] })
    setLeft(validPercentage)
    props.onMoveTriggerDone?.(validPercentage * maxValue)
  }
  return (
    <View
      {...pick(props, ViewProp)}
      _componentName_='Slider'
      onClick={(e) => {
        const slider = (e.target as HTMLDivElement).parentElement!
        const { left: trackClientLeft, width: trackWidth } = slider.getBoundingClientRect()
        moveTriggerDone((e.clientX - trackClientLeft) / trackWidth)
      }}
      html={{
        onWheel: (e) => {
          moveTriggerDone(triggerLeft.getValue() + Math.sign(e.deltaY) * 0.1)
        },
      }}
    >
      <View
        className='Trigger'
        html={{
          onPointerDown: (e) => {
            const slider = ((e.target as Element).parentElement as HTMLDivElement)!
            const trigger = (slider.querySelector('.Trigger') as HTMLDivElement)!
            const passedTrack = (slider.querySelector('.PassedTrack') as HTMLDivElement)!
            trigger.style.transition = 'none'
            passedTrack.style.transition = 'none'
            const { left: sliderClientLeft, width: sliderWidth } = slider.getBoundingClientRect()
            /**
             * document 绑定拖拽事件
             */
            const moveHandler = (e: PointerEvent) => {
              inDraggingTrigger.turnOn()
              moveTrigger((e.clientX - sliderClientLeft) / sliderWidth)
            }
            /**
             * 清理 document 上述事件
             */
            const handlerDone = (e: PointerEvent) => {
              trigger.style.transition = ''
              passedTrack.style.transition = ''
              inDraggingTrigger.turnOff()
              moveTriggerDone((e.clientX - sliderClientLeft) / sliderWidth)
              document.removeEventListener('pointermove', moveHandler)
              document.removeEventListener('pointerup', handlerDone)
            }
            document.addEventListener('pointermove', moveHandler)
            document.addEventListener('pointerup', handlerDone)
          },
        }}
        style={{
          left: styleLeft,
        }}
      />
      <View className='Track'>
        <View
          className='PassedTrack'
          style={{
            width: styleLeft,
          }}
        />
      </View>
    </View>
  )
}

export default React.memo(Slider) as typeof Slider
