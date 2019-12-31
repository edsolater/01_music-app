import React, { ReactNode, useState, MouseEvent } from 'react'
import './Button.less'
import { View, SlotName, __ComponentCanTap } from '.'

function Button({
  Slot_Content,
  modes,
  initMode,
  onClick,
  onModeChange,
  ...restProps
}: Omit<React.ComponentProps<typeof View>, 'onClick'> & {
  Slot_Content?: ReactNode
  modes?: string[]
  /**
   * 生效前提：mode
   */
  initMode?: string
  onClick?: (event: MouseEvent, changeToNextMode?: () => any) => any
  /**
   * 生效前提： onClick
   */
  onModeChange?: (newMode: string) => any //需要更generic
}) {
  const [currentMode, changeMode] = modes ? useState(initMode) : []
  return (
    <__ComponentCanTap
      componentName={['Button', currentMode]}
      onClick={(e) => {
        const changeToNextMode =
          modes &&
          (() => {
            const prevIndex = modes.findIndex((modeString) => currentMode === modeString)
            const newIndex = (prevIndex + 1) % modes.length
            if (changeMode) changeMode(modes[newIndex])
            onModeChange?.(modes[newIndex])
          })
        onClick?.(e, changeToNextMode)
        if (onClick) onClick(e)
      }}
      {...restProps}
    >
      {<SlotName className='Content'>{Slot_Content ?? restProps.children}</SlotName>}
    </__ComponentCanTap>
  )
}

export default React.memo(Button) as typeof Button
