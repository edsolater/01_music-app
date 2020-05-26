import React, { ComponentProps, useEffect, useReducer } from 'react'

import './Slider.scss'
import { useDomStyle } from '../customHooks'
import { View } from '../wrappers'
import { clamp } from 'utils/number'

/**
 * TODO: 这个Slider会导致两次触发onMoveTriggerDone（click事件、PointerUp事件分别会触发一次）IDEA： 加个函数防抖能轻松解决？
 * TODO：此组件的 逻辑过于混乱，要重写
 * 注意它只能理解数字
 */
function Slider(
  props: ComponentProps<typeof View> & {
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
     * !容易引起性能问题！
     * 只要拖动trigger的手柄就会触发这个事件，所以这个事件会触发多次
     */
    onMoveTrigger?: (currentSecond: number) => unknown
    /**
     * 只在最后触发一次
     */
    onMoveTriggerDone?: (currentSecond: number) => unknown
  }
) {
  const [isDragging, toggleDragStatus] = useReducer(v => !v, false)
  const [triggerRef, setTriggerLeft] = useDomStyle(style => (percentage: number) => {
    style.left = `${percentage * 100}%`
  })
  const [tailTrackRef, setTrackPassWidth] = useDomStyle(style => (percentage: number) => {
    style.width = `${percentage * 100}%`
  })
  const setStyleByMove = (percentage: number = 0) => {
    setTriggerLeft(percentage)
    setTrackPassWidth(percentage)
  }

  useEffect(() => {
    setStyleByMove(props.defaultValue ?? props.value)
  }, [])
  useEffect(() => {
    if (!isDragging && props.max && typeof props.value === 'number') {
      setStyleByMove(props.value / props.max)
    }
  }, [props.value])

  return (
    <View
      {...props}
      $componentName='Slider'
      onClick={e => {
        if (isDragging) return
        const slider = (e.target as HTMLDivElement).parentElement!
        const { left: trackClientLeft, width: trackWidth } = slider.getBoundingClientRect()
        const percentage = (e.clientX - trackClientLeft) / trackWidth
        setStyleByMove(percentage)
        props.onMoveTriggerDone?.(percentage * (props.max ?? 1))
      }}
    >
      <View
        className='Trigger'
        ref={triggerRef}
        html={{
          onPointerDown: e => {
            toggleDragStatus()
            const slider = ((e.target as Element).parentElement as HTMLDivElement)!
            const trigger = (slider.querySelector('.Trigger') as HTMLDivElement)!
            const passedTrack = (slider.querySelector('.PassedTrack') as HTMLDivElement)!
            trigger.style.transition = 'none'
            passedTrack.style.transition = 'none'
            const { left: sliderClientLeft, width: sliderWidth } = slider.getBoundingClientRect()
            /**
             * document 绑定拖拽事件
             */
            const handleMove = (e: PointerEvent) => {
              const percentage = clamp((e.clientX - sliderClientLeft) / sliderWidth, [0, 1])
              setStyleByMove(percentage)
              props.onMoveTrigger?.(percentage * (props.max ?? 1))
            }
            /**
             * 清理 document 上述事件
             */
            const handleDone = (e: PointerEvent) => {
              setTimeout(() => {
                toggleDragStatus()
              }, 0)
              trigger.style.transition = ''
              passedTrack.style.transition = ''
              const percentage = clamp((e.clientX - sliderClientLeft) / sliderWidth, [0, 1])
              setStyleByMove(percentage)
              props.onMoveTriggerDone?.(percentage * (props.max ?? 1))
              document.removeEventListener('pointermove', handleMove)
              document.removeEventListener('pointerup', handleDone)
            }
            document.addEventListener('pointermove', handleMove)
            document.addEventListener('pointerup', handleDone)
          }
        }}
      />
      <View className='Track'>
        <View ref={tailTrackRef} className='PassedTrack' />
      </View>
    </View>
  )
}

export default React.memo(Slider) as typeof Slider
