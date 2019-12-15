import React, { ReactNode } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import { useMaster } from 'mypack/basic_components/__customHooks'
import './Popover.less'

function Popover({
  className,
  open,
  delayTime,
  Content,
  children,
  ...restProps
}: {
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  /**
   * Popover是否打开。此属性将开关的逻辑完全交给父元素控制。可以实现更复杂的控制但大多数时候使用默认交互方式即可
   */
  open?: boolean
  /**
   * 延迟关闭的延迟时间。(只有当交互行为由组件内部自行控制控时生效)
   */
  delayTime?: number
  /**
   * Popover 的content的内容
   */
  Content?: ReactNode
} & JSX.IntrinsicElements['div']) {
  const controller = useMaster({ type: 'on-off-reporter' }).isImmutable(open)
  return (
    <div
      className={classnames(className, 'Popover', 'Wrapper', { on: open ?? controller.isOn })}
      onPointerEnter={() => {
        controller.show()
        controller.dismissDeferHide()
      }}
      onPointerLeave={() => {
        controller.deferHide(delayTime)
      }}
    >
      <div
        className={classnames('Content', { on: open ?? controller.isOn })}
        onPointerEnter={() => {
          controller.dismissDeferHide()
        }}
        onPointerLeave={() => {
          controller.deferHide(delayTime)
        }}
        {...restProps}
      >
        {Content}
      </div>
      {children}
    </div>
  )
}
export default React.memo(Popover) as typeof Popover
