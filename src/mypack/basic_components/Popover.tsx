import React, { ReactNode } from 'react'
import { useMaster } from 'mypack/basic_components/customHooks'
import './Popover.less'
import { View, ComponentName } from '.'

function Popover({
  className: className,
  open,
  delayTime,
  Slot_Content,
  children,
  ...restProps
}: React.ComponentProps<typeof View> & {
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
  Slot_Content?: ReactNode
}) {
  const controller = useMaster({ type: 'on-off' }).isImmutable(open)
  return (
    <ComponentName
      componentName={['Popover', 'Wrapper', { on: open ?? controller.isOn }]}
      onPointerEnter={() => {
        controller.show()
        controller.dismissDeferHide()
      }}
      onPointerLeave={() => {
        controller.deferHide(delayTime)
      }}
    >
      <View
        className={[className, 'Content', { on: open ?? controller.isOn }]}
        onPointerEnter={() => {
          controller.dismissDeferHide()
        }}
        onPointerLeave={() => {
          controller.deferHide(delayTime)
        }}
        {...restProps}
      >
        {Slot_Content}
      </View>
      {children}
    </ComponentName>
  )
}
export default React.memo(Popover) as typeof Popover
