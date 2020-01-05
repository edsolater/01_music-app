import React, { ReactNode } from 'react'
import { useMasterOnOff } from 'mypack/basic_components/customHooks'
import './Popover.scss'
import { View, ComponentRoot } from '.'

function Popover({
  onPointerEnter,
  onPointerLeave,

  open,
  delayTime,
  Content,
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
   * #Slot#
   *
   * Popover 的content的内容
   */
  Content?: ReactNode
}) {
  const onOffController = useMasterOnOff(false)
  const triggerCallback = {
    on: () => onOffController.show(),
    off: () => onOffController.deferHide(delayTime),
  }
  return (
    <ComponentRoot
      name={['Popover', 'wrapper-part', { on: open ?? onOffController.isOn }]}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
        triggerCallback.on()
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)
        triggerCallback.off()
      }}
      {...restProps}
    >
      <View //content不一定得是card形式，Card单独提成一个组件
        className={['Popover', 'content-part', { on: open ?? onOffController.isOn }]}
        onPointerEnter={() => triggerCallback.on()}
        onPointerLeave={() => triggerCallback.off()}
      >
        {Content} {/* slot */}
      </View>
      {children} {/* slot */}
    </ComponentRoot>
  )
}
export default React.memo(Popover) as typeof Popover
