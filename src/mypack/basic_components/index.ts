// 为了能够使用 autoImport 能力
export { default as View } from './View'
export { default as Text } from './Text'
export { default as Image } from './Image'

// View 的语义变体，都有一个name的props，以指定名称
export { default as ComponentRoot } from './ComponentRoot'
export { default as Slot } from './Slot'
export { default as SlotScope } from './SlotScope'
//TODO: Header
//TODO: Footer
//TODO: Section

// 普通组件
export { default as Slider } from './Slider'
export { default as List } from './List'
export { default as Label } from './Label'
export { default as ImageFalls } from './ImageFalls'

//Wrapper 系列，写组件时可随意添加，现存页面无感
export { default as Button } from './Button' 
export { default as Popover } from './Popover'
export { default as Group } from './Group'

export * from './customHooks'