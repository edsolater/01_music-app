import React, { ReactNode, ComponentProps } from 'react'
import { useMasterBoolean } from 'mypack/basic_components/customHooks'
import './Popover.scss'
import { Slot, View } from '.'

/**
 * TODO:要向RedDot学习，做一个子组件而不是父级组件
 */
function Popover(
  props: ComponentProps<typeof View> & {
    /**
     * Popover是否打开。此属性将开关的逻辑完全交给父元素控制。可以实现更复杂的控制但大多数时候使用默认交互方式即可
     */
    open?: boolean
    /**
     * 是否默认开启
     */
    defaultOpen?: boolean
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
  },
) {
  const onOffController = useMasterBoolean(Boolean(props.defaultOpen))
  // console.log('onOffController: ', onOffController.isOn) //TODO为什么这里会触法4次呢？
  const triggerCallback = {
    on: () => {
      onOffController.show().dismissDeferHide()
    },
    off: () => onOffController.deferHide(props.delayTime),
  }
  return (
    <View
      {...props}
      $componentName={['Popover', 'wrapper-part', { on: props.open ?? onOffController.isOn }]}
      html={{
        ...props.html,
        onPointerEnter: event => {
          props.html?.onPointerEnter?.(event)
          triggerCallback.on()
        },
        onPointerLeave: event => {
          props.html?.onPointerLeave?.(event)
          triggerCallback.off()
        },
      }}
    >
      <Slot //content不一定得是card形式，Card单独提成一个组件
        slotName={['Popover', 'content-part', { on: props.open ?? onOffController.isOn }]}
        html={{
          onPointerEnter: () => triggerCallback.on(),
          onPointerLeave: () => triggerCallback.off(),
        }}
      >
        {props.Content} {/* slot */}
      </Slot>
      {props.children} {/* slot */}
    </View>
  )
}
export default React.memo(Popover) as typeof Popover
