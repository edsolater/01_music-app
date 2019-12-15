import React, { ReactNode, useState, MouseEvent } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import './Button.less'
import { View } from '..'

function Button({
  className,
  Slot_Content,
  children,
  modes,
  initMode: _initMode,
  onClick,
  onModeChange,
  ...restProps
}: Omit<React.ComponentProps<typeof View>, 'onClick'> & {
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
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
  const [currentMode, changeMode] = modes ? useState(_initMode) : []
  return (
    <View
      className={classnames(className, 'Button', currentMode)}
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
      {(Slot_Content ?? children) && <View className='Content'>{Slot_Content ?? children}</View>}
    </View>
  )
}
export default React.memo(Button) as typeof Button
