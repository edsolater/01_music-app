/************
 *
 * 以 "__" 开头的组件名地位类似CSS中的伪元素
 * 以 "_" 开头的组件名地位类似CSS中的伪类（表示状态）
 *
 ************/

/**
 * View的小封装，使写组件更表意
 */
export { default as Slot } from './Slot'
export * from './Slot'
export { default as GhostNode } from './GhostNode'

/*
 * 基本HTML及其包装（用途专有）
 */
export { default as View } from './View' // 通过View，使用 <div>
export * from './View'
export { default as Header } from './Header'
export { default as Footer } from './Footer'
export { default as Box } from './Box'

export { default as Text } from './Text' // 通过View，使用 <div>
export { default as LongText } from './LongText'
export { default as Image } from './Image' // 通过View，使用 <img>
export { default as ImageBox } from './ImageBox'
export { default as Avatar } from './Avatar'
export { default as Icon } from './Icon'

/**
 * 普通组件
 */
export { default as Button } from './Button'
export { default as Divider } from './Divider'
export { default as Slider } from './Slider'
export { default as Menu } from './Menu'
export { default as List } from './List'
export { default as Label } from './Label'
export { default as ImageFalls } from './ImageFalls'

/**
 * Wrapper 系列，写组件时可随意添加，类似于装饰器的概念。装载在目标元素内部
 */
export { default as Popover } from './Popover'
export { default as Badge } from './Badge'

/**
 * 特殊组件
 */
export * from './customHooks'