import React, { ReactNode } from 'react'
import { useMasterOnOff } from 'mypack/basic_components/customHooks'
import './Popover.scss'
import { View, ComponentRoot, Slot } from '.'
import { ClassValue } from 'classnames/types'

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
  const controller = useMasterOnOff(false)
  // 子元素绝对定位是受限制的，要绝对定位的话必须连Popover一起绝对定位
  return (
    <ComponentRoot
      name={['Popover', 'wrapper-box', { on: open ?? controller.isOn }]}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
        controller.show()
        controller.dismissDeferHide()
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)
        controller.deferHide(delayTime)
      }}
      {...restProps}
    >
      <View //content不一定是card形式，Card单独提成一个组件
        className={['Popover', 'content-box', { on: open ?? controller.isOn }]}
        onPointerEnter={(e) => {
          controller.dismissDeferHide()
        }}
        onPointerLeave={() => {
          controller.deferHide(delayTime)
        }}
      >
        {Content} {/* slot */}
      </View>
      {children} {/* slot */}
    </ComponentRoot>
  )
}
function TriggerArea({
  name,
  className,
  ...restProps
}: React.ComponentProps<typeof View> & {
  /**
   * 用于各个组件定义组件的名字更方便
   */
  name?: ClassValue
}) {
  return <View className={[className, name]} {...restProps} />
}
export default React.memo(Popover) as typeof Popover
