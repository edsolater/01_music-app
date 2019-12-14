import React, { ReactNode } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import './Popover.less'
import { useUIMonitor } from '../__customHooks'
type UICommander = {
  showPopover(): void
}
type UIState = {
  isOn: boolean
}
function Popover({
  className,
  isOn: _isOn,
  delayTime,
  Content,

  children,
  uiCommander,
  uiState,
  ...restProps
}: {
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  /**
   * Popover是否打开。此属性将开关的逻辑完全交给父元素控制。可以实现更复杂的控制但大多数时候使用默认交互方式即可
   */
  isOn?: boolean
  /**
   * 延迟关闭的延迟时间。(只有当交互行为由组件内部自行控制控时生效)
   */
  delayTime?: number
  /**
   * Popover 的content的内容
   */
  Content?: ReactNode
  /**
   * 暴露出Popover组件的控制命令
   */
  uiCommander?: UICommander
  /**
   * 暴露出Popover组件的当前状态
   */
  uiState?: UIState
} & JSX.IntrinsicElements['div']) {
  const controller = useUIMonitor({ type: 'on-off-reporter' }).isImmutable(_isOn)

  //#region 上抛commander
  if (uiCommander) {
    Object.assign(uiCommander, {
      showPopover() {
        return controller.show()
      },
    } as UICommander)
  }
  //#endregion
  //#region 上抛 UIState
  if (uiState) {
    Object.assign(uiState, {
      isOn: _isOn ?? controller.isOn,
    } as UIState)
  }
  //#endregion
  return (
    <div
      className={classnames(className, 'Popover', 'Wrapper', { on: _isOn ?? controller.isOn })}
      onPointerEnter={() => {
        controller.show()
        controller.dismissDeferHide()
      }}
      onPointerLeave={() => {
        controller.deferHide(delayTime)
      }}
    >
      <div
        className={classnames('Content', { on: _isOn ?? controller.isOn })}
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
