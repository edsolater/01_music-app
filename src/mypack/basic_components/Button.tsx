import React, { ReactNode, useState, MouseEvent } from 'react'
import './Button.less'
import { Slot, ComponentRoot } from '.'

function Button({
  Slot_Content,
  modes,
  initMode,
  onClick,
  onModeChange,
  ...restProps
}: Omit<React.ComponentProps<typeof ComponentRoot>, 'onClick'> & {
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
    <ComponentRoot
      name={['Button', currentMode]}
      onClick={(e) => {
        /* TODO: 阻碍了想象，要删掉 */
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
      {<Slot name='Content'>{Slot_Content ?? restProps.children}</Slot>}
    </ComponentRoot>
  )
}

export default React.memo(Button) as typeof Button
