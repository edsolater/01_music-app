import React, { FC, ReactNode } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import './Popover.less'
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
  <div className={classnames(className, 'Popover','Wrapper', { 'is-open': isOpen })}>
    {Content && (
      <div className={classnames('Content', { on: isOpen })} {...restProps}>
        {Content}
      </div>
    )}
    {children}
  </div>
)
export default React.memo(Popover)
