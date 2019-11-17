import React, { FC, useRef, useState } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'

const Slider: FC<{
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
} & JSX.IntrinsicElements['div']> = ({ className, ...restProps }) => {
  const sliderTriggerRef = useRef(null)
  const [pasedLeft, setLeft] = useState(0)
  const dragTrigger = (event: MouseEvent, parentNode:HTMLElement) => {
    const newLeft = event.clientX -  parentNode.offsetLeft
    setLeft(newLeft)
  }
  return (
    <div className={classnames(className, 'Slider')} {...restProps}>
      <div
        className="SliderTrigger"
        ref={sliderTriggerRef}
        onMouseDown={() => {
          const parentElement = (((sliderTriggerRef.current as unknown) as HTMLDivElement).parentElement)!
          const tempMoveTrigger = (e: MouseEvent) => dragTrigger(e, parentElement)
          const tempSolidTrigger = () => {
            document.removeEventListener('mousemove', tempMoveTrigger)
            document.removeEventListener('mouseup', tempSolidTrigger)
          }
          document.addEventListener('mousemove', tempMoveTrigger)
          document.addEventListener('mouseup', tempSolidTrigger)
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
