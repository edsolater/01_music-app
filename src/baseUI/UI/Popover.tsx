import React, { ReactNode, ComponentProps, useRef, FC } from 'react'
import { useBoolean } from 'baseUI/customHooks'
import './Popover.scss'
import View from './View'

/**
 * TODO:要使用react的新ProtalsAPI
 *
 * @see https://reactjs.org/docs/portals.html
 */
const Popover: FC<
  ComponentProps<typeof View> & {
    /** 控制Popover是否开启状态。*/
    open?: boolean
    /** Popover是否默认开启状态 */
    defaultOpen?: boolean
    /** 状态切换的延迟时间。(不设定open时生效)*/
    delayTime?: number
    /** 绘制 Popover 的内部内容*/
    renderPopContent?: ReactNode
  }
> = props => {
  const timeoutRef = useRef(NaN)
  const setTimeoutId = (newId: number) => (timeoutRef.current = newId)
  const [isOpen, setters] = useBoolean(props.defaultOpen)
  const triggerCallback = {
    on: () => {
      window.clearTimeout(timeoutRef.current)
      setTimeoutId(NaN)
      setters.on()
    },
    off: () => {
      const id = window.setTimeout(() => {
        setTimeoutId(NaN)
        setters.off()
      }, props.delayTime ?? 600)
      setTimeoutId(id)
    }
  }
  return (
    <View
      {...props}
      $componentName={['Popover', 'wrapper-part', { on: props.open ?? isOpen === true }]}
      html={{
        ...props.html,
        onPointerEnter: event => {
          props.html?.onPointerEnter?.(event)
          triggerCallback.on()
        },
        onPointerLeave: event => {
          props.html?.onPointerLeave?.(event)
          triggerCallback.off()
        }
      }}
    >
      <View //content不一定得是card形式，Card单独提成一个组件
        className={['Popover', 'content-part', { on: props.open ?? isOpen === true }]}
        html={{
          onPointerEnter: e => {
            e.stopPropagation() //因为 content-part 在 wrapper-part 内部，所以会触发2次
            return triggerCallback.on()
          },
          onPointerLeave: e => {
            e.stopPropagation()
            return triggerCallback.off()
          }
        }}
      >
        {props.renderPopContent}
      </View>
      {props.children}
    </View>
  )
}

Popover.displayName = 'UIPropover'

export default Popover
