import React, { FC, ReactNode } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import { StateBooleanUI } from 'mypack/class'
export const Popover: FC<{
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  showHideObject?: StateBooleanUI
  Content?: ReactNode
} & Omit<JSX.IntrinsicElements['div'], 'onChange'>> = ({
  className,
  showHideObject,
  children,
  Content,
  ...restProps
}) => (
  <div
    className={classnames(className, 'Popover')}
    // ref={props.volumnPanelRef}
    onClick={() => console.log(`I'm clicked sd`)}
    style={{
      opacity: showHideObject?.value ? 1 : 0,
      pointerEvents: showHideObject?.value ? 'unset' : 'none',
    }}
    onPointerEnter={() => {
      showHideObject?.dismissDeferHide()
    }}
    onPointerLeave={() => {
      showHideObject?.deferHide()
    }}
    {...restProps}
  >
    {(Content || children) && <div className="Content">{Content || children}</div>}
  </div>
)
export default Popover
