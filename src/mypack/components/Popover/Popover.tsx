import React, { FC, ReactNode } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import './Popover.css'
const Popover: FC<{
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  /**
   * Popover是开启状态
   */
  isOpen: boolean
  Content?: ReactNode
} & JSX.IntrinsicElements['div']> = ({ className, isOpen, Content, children, ...restProps }) => (
  <div
    className={classnames(className, 'Popover', { 'is-open': isOpen })}
    // ref={props.volumnPanelRef}
    onClick={() => console.log(`I'm clicked sd`)}
    style={
      {
        // opacity: isOpen ? undefined : 0,
        // pointerEvents: isOpen ? undefined : 'none',
      }
    }
    {...restProps}
  >
    {(Content || children) && <div className="Content">{Content || children}</div>}
  </div>
)
export default React.memo(Popover)
