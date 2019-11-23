import React, { FC, ReactNode, useState, MouseEvent } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import './Button.css'
const Button: FC<{
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  Content?: ReactNode
  modes?: string[]
  /**
   * 生效前提：mode
   */
  initMode?: string
  on?: {
    click?: (event: MouseEvent, changeToNextMode: (() => void) | undefined) => void
    /**
     * 生效前提： onClick
     */
    modeChange?: (newMode: string) => void //需要更generic
  }
} & JSX.IntrinsicElements['div']> = ({
  className,
  Content,
  children,
  modes,
  initMode: _initMode,
  on,
  onClick,
  ...restProps
}) => {
  const [currentMode, changeMode] = modes ? useState(_initMode) : []
  return (
    <div
      className={classnames(className, 'Button', currentMode)}
      onClick={(e) => {
        const changeToNextMode =
          modes &&
          (() => {
            const prevIndex = modes.findIndex((modeString) => currentMode === modeString)
            const newIndex = (prevIndex + 1) % modes.length
            if (changeMode) changeMode(modes[newIndex])
            if (on && on.modeChange) on.modeChange(modes[newIndex])
          })
        if (on && on.click) on.click(e, changeToNextMode)
        if (onClick) onClick(e)
      }}
      {...restProps}
    >
      {(Content || children) && <div className="Content">{Content || children}</div>}
    </div>
  )
}
export default React.memo(Button)
