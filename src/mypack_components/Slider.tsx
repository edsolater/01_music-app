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
  initCurrent?: number
  onChangeCurrentByTrigger?: Function
  widgetHandler?: {
    change?:{
      current?:Function
    }
  }
} & JSX.IntrinsicElements['div']> = ({
  className,
  total = 100,
  initCurrent = 0,
  widgetHandler,
  onChangeCurrentByTrigger,
  ...restProps
}) => {
  const sliderTriggerRef = useRef(null)
  const [pasedLeft, setLeft] = useState(`${(initCurrent / total) * 100}%`)
  const [isDragged, setIsDragged] = useState(false)
  attachWidgetHandlers(widgetHandler, {
    change: {
      current: (seconds: number) => {
        if (isDragged) return
        else setLeft(`${(seconds/total) * 100}%`)
      }
    }
  })
  const dragTrigger = (
    event: MouseEvent,
    elementSlider: HTMLElement,
    elementSliderTrigger: HTMLElement
  ) => {
    const current = (event.clientX - elementSlider.offsetLeft) / elementSlider.offsetWidth
    if (current < 0) {
      setLeft(`${0}%`)
    } else if (current > 1) {
      setLeft(`${100}%`)
    } else {
      setLeft(`${current * 100}%`)
    }
    if (onChangeCurrentByTrigger) onChangeCurrentByTrigger(current * total)
  }
  //逻辑太繁杂了，要精简
  return (
    <div className={classnames(className, 'Slider')} {...restProps}>
      <div
        className="SliderTrigger"
        ref={sliderTriggerRef}
        onMouseDown={() => {
          const elementSliderTrigger = (sliderTriggerRef.current as unknown) as HTMLDivElement
          const elementSlider = elementSliderTrigger.parentElement!
          setIsDragged(true)
          const tempMoveTrigger = (e: MouseEvent) => {
            return dragTrigger(e, elementSlider, elementSliderTrigger)
          }
          const tempStopTrigger = () => {
            setIsDragged(false)
            document.removeEventListener('mousemove', tempMoveTrigger)
            document.removeEventListener('mouseup', tempStopTrigger)
          }
          document.addEventListener('mousemove', tempMoveTrigger)
          document.addEventListener('mouseup', tempStopTrigger)
        }}
        style={{
          left: pasedLeft
        }}
      />
      <div className="SliderTrack" />
    </div>
  )
}
export default Slider
