import React, { ReactNode, ComponentProps, useRef } from 'react'
import { useBoolean, useRefData } from 'mypack/components/customHooks'
import './Popover.scss'
import { View } from '../wrappers'

/**
 * TODO:要向Badge学习，做一个子组件而不是父级组件
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
    renderPopContent?: ReactNode
  },
) {
  // const [timeoutId, setTimeoutId] = useRefData(0)
  const timeoutRef = useRef(0)
  const [isOpen, setters] = useBoolean(props.defaultOpen)
  const triggerCallback = {
    on: () => {
      if (!isOpen) setters.set(true)
      window.clearTimeout(timeoutRef.current)
    },
    off: () => {
      const id = window.setTimeout(() => {
        setters.set(false)
      }, props.delayTime ?? 600)
      timeoutRef.current = id
    },
  }
  return (
    <View
      {...props}
      $componentName={['Popover', 'wrapper-part', { on: props.open ?? isOpen === true }]}
      html={{
        ...props.html,
        onPointerEnter: (event) => {
          props.html?.onPointerEnter?.(event)
          triggerCallback.on()
        },
        onPointerLeave: (event) => {
          props.html?.onPointerLeave?.(event)
          triggerCallback.off()
        },
      }}
    >
      <View //content不一定得是card形式，Card单独提成一个组件
        className={['Popover', 'content-part', { on: props.open ?? isOpen === true }]}
        html={{
          onPointerEnter: (e) => {
            e.stopPropagation() //因为 content-part 在 wrapper-part 内部，所以会触发2次
            return triggerCallback.on()
          },
          onPointerLeave: () => triggerCallback.off(),
        }}
      >
        {props.renderPopContent}
      </View>
      {props.children}
    </View>
  )
}
export default React.memo(Popover) as typeof Popover
