import React, { ReactNode } from 'react'
import { useMasterOnOff } from 'mypack/basic_components/customHooks'
import './Popover.less'
import { View, ComponentRoot, Slot } from '.'
import { ClassValue } from 'classnames/types'

function Popover({
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
   * Slot
   *
   * Popover 的content的内容
   */
  Content?: ReactNode
}) {
  const controller = useMasterOnOff(false)
  return (
    <ComponentRoot name={['Popover', { on: open ?? controller.isOn }]} {...restProps}>
      <View //content不一定是card形式，Card单独提成一个组件
        className={['Content', { on: open ?? controller.isOn }]}
        onPointerEnter={() => {
          controller.dismissDeferHide()
        }}
        onPointerLeave={() => {
          controller.deferHide(delayTime)
        }}
      >
        {Content} {/* slot */}
      </View>
      <View //TODO: 暂且这样，但如果子内容需要绝对定位怎么办？
        className='TriggerArea'
        onPointerEnter={() => {
          controller.show()
          controller.dismissDeferHide()
        }}
        onPointerLeave={() => {
          controller.deferHide(delayTime)
        }}
      >
        {children} {/* slot */}
      </View>
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
