import React, { ComponentProps, useRef, useEffect, useReducer } from 'react'

import './Slider.scss'
import { useMaster, useDomStyle, useMethods } from '../customHooks'
import { View } from '.'
import { UGuard } from 'mypack/utils/UGuard'

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
  },
) {
  const [isDragging, toggleDragStatus] = useReducer(v => !v, false)
  const [triggerRef, triggerStyleDispatcher] = useDomStyle()
  const setTriggerLeft = (percentage = Number(props.defaultValue ?? 1)) => {
    triggerStyleDispatcher(style => {
      style.left = `${percentage * 100}%`
    })
  }
  // 异想天开： 使用初始化时传入函数，以省去 tailTrackStyleDispatcher
  const [tailTrackRef, tailTrackStyleDispatcher] = useDomStyle()
  const setTrackPassWidth = (percentage = Number(props.defaultValue ?? 1)) => {
    tailTrackStyleDispatcher(style => {
      style.width = `${percentage * 100}%`
    })
  }
  useEffect(() => {
    setTrackPassWidth(props.defaultValue ?? props.value)
    setTriggerLeft(props.defaultValue ?? props.value)
  }, [])
  useEffect(() => {
    if (!isDragging && props.max && typeof props.value === 'number') {
      setTrackPassWidth(props.value / props.max)
      setTriggerLeft(props.value / props.max)
    }
  }, [props.value])

  /**
   * 移动 Trigger
   */
  const moveTriggerDone = (percentage: number) => {
    setTriggerLeft(percentage)
    setTrackPassWidth(percentage)
    props.onMoveTriggerDone?.(percentage * (props.max ?? 1))
  }
  return (
    <View
      {...props}
      $componentName='Slider'
      onClick={e => {
        const slider = (e.target as HTMLDivElement).parentElement!
        const { left: trackClientLeft, width: trackWidth } = slider.getBoundingClientRect()
        moveTriggerDone((e.clientX - trackClientLeft) / trackWidth)
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
              const percentage = UGuard.number((e.clientX - sliderClientLeft) / sliderWidth, {
                range: [0, 1],
              })
              setTriggerLeft(percentage)
              setTrackPassWidth(percentage)
              props.onMoveTrigger?.(percentage * (props.max ?? 1))
            }
            /**
             * 清理 document 上述事件
             */
            const handleDone = (e: PointerEvent) => {
              toggleDragStatus()
              //FIXME: 触发pointerUp的同时，也会触发上级的onClick，因此 moveTriggerDone会被触法两次
              trigger.style.transition = ''
              passedTrack.style.transition = ''
              moveTriggerDone((e.clientX - sliderClientLeft) / sliderWidth)
              document.removeEventListener('pointermove', handleMove)
              document.removeEventListener('pointerup', handleDone)
            }
            document.addEventListener('pointermove', handleMove)
            document.addEventListener('pointerup', handleDone)
          },
        }}
      />
      <View className='Track'>
        <View ref={tailTrackRef} className='PassedTrack' />
      </View>
    </View>
  )
}

export default React.memo(Slider) as typeof Slider
