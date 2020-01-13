// 为了能够使用 autoImport 能力
export { default as Image } from './Image'
/**
 * 写组件时更表意
 */
export { default as ComponentRoot } from './ComponentRoot' // 有一个 name 的 prop ，用于指定组件名称
export { default as Slot } from './Slot'
export { default as SlotScope } from './SlotScope'

/*
 * View 及其浅层包装（用途专有）
 */
export { default as View } from './View'
export { default as Header } from './Header'
export { default as Footer } from './Footer'
export { default as Section } from './Section'
export { default as Item } from './Item'

/*
 * Text 及其浅层包装（用途专有）
 */
export { default as Text } from './Text'
export { default as Title } from './Title'

/**
 * 普通组件
 */
export { default as Slider } from './Slider'
export { default as Menu } from './Menu'
export { default as Label } from './Label'
export { default as ImageFalls } from './ImageFalls'

/**
 * Wrapper 系列，写组件时可随意添加，现存页面无感
 */
export { default as Button } from './Button'
export { default as Popover } from './Popover'
export { default as Group } from './Group'

export * from './customHooks'
