import React, { FC, ReactNode, useState, MouseEvent, ComponentProps } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import './index.css'
export const Button: FC<{
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  Text?: ReactNode
  modes?: string[]
  /**
   * 生效前提：mode
   */
  initMode?: string
  onClick?: (event: MouseEvent, changeToNextMode: (() => void) | undefined) => void
  /**
   * 生效前提： onClick
   */
  onModeChange?: (newMode: string) => void
}&  Omit<JSX.IntrinsicElements['div'],"onClick">> = ({ className, Text, modes, initMode: _initMode, onClick, onModeChange,...restProps }) => {
  const [currentMode, changeMode] = modes ? useState(_initMode) : []
  return (
    <div
      className={classnames(className, 'Button', currentMode)}
      onClick={e => {
        const changeToNextMode =
          modes &&
          (() => {
            const prevIndex = modes.findIndex(modeString => currentMode === modeString)
            const newIndex = (prevIndex + 1) % modes.length
            if (changeMode) changeMode(modes[newIndex])
            if (onModeChange) onModeChange(modes[newIndex])
          })
        if (onClick) onClick(e, changeToNextMode)
      }}
      {...restProps}
    >
      {Text && <div className="Text">{Text}</div>}
    </div>
  )
}
export default Button

type ao = (...any) =>2
