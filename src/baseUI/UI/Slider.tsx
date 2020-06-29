import React, { ComponentProps, useEffect, useReducer } from 'react'

import './Slider.scss'
import { useDomStyle } from '../customHooks'
import View from './View'
import { clamp } from 'functions/number'

/**
 * TODO - 这个组件考虑地不够全面，当完成度有80%时要重写
 * 注意它只能理解数字
 */
function Slider(
  props: ComponentProps<typeof View> & {
    /**
     * 当前所在位置 (百分比，初始值)
     */
    defaultValue?: number
    /**
     * 当前所在位置（百分比）
     */
    value?: number
    /**
     * 处于拖动的过程就连续触发
     */
    onMoveTrigger?: (percent: number) => void
    /**
     *  只在最后触发一次
     */
    onMoveTriggerDone?: (percent: number) => void
  }
) {
  const [isDragging, toggleDragStatus] = useReducer(v => !v, false)
  const [triggerRef, setTriggerLeft] = useDomStyle(style => (percentage: number) => {
    style.left = `${percentage * 100}%`
  })
  const [tailTrackRef, setTrackPassWidth] = useDomStyle(style => (percentage: number) => {
    style.width = `${percentage * 100}%`
  })

  const setStyleByMove = (percentage: number | undefined) => {
    if (percentage === undefined) return
    const clampedPercent = clamp(percentage)
    setTriggerLeft(clampedPercent)
    setTrackPassWidth(clampedPercent)
  }

  useEffect(() => {
    setStyleByMove(props.defaultValue ?? props.value)
  }, [])
  useEffect(() => {
    if (!isDragging && typeof props.value === 'number') {
      setStyleByMove(props.value)
    }
  }, [props.value])

  return (
    <View
      {...props}
      className={[props.className, 'Slider']}
      onClick={e => {
        if (isDragging) return
        const slider = (e.target as HTMLDivElement).parentElement!
        const { left: trackClientLeft, width: trackWidth } = slider.getBoundingClientRect()
        const percentage = (e.clientX - trackClientLeft) / trackWidth
        setStyleByMove(percentage)
        props.onMoveTriggerDone?.(percentage)
      }}
    >
      <View
        className='Trigger'
        ref={triggerRef}
        originProps={{
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
              props.onMoveTrigger?.(percentage)
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
              props.onMoveTriggerDone?.(percentage)
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
