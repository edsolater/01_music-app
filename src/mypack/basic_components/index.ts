// 为了能够使用 autoImport 能力
export { default as View } from './View'
export { default as Text } from './Text'
export { default as Image } from './Image'

// View 的语义变体
export { default as ComponentName } from './ComponentName'
export { default as SlotName } from './SlotName'

export { default as __ComponentCanTap } from './__ComponentCanTap' // "__ComponentCan"/"can" 开头表示一种能力 //只是个语义化包装
export { default as CanTap } from './CanTap' // __ComponentCanTap的 “显式版”（"__"前缀的需在devTool中隐藏）
export { default as Button } from './Button' // __ComponentCanTap的典型应用

export { default as __ComponentCanSwitchStatus } from './__ComponentCanSwitchStatus'
export { default as CanSwitchStatus } from './CanSwitchStatus' // __ComponentCanSwitchStatus “显式版”（"__"前缀的需在devTool中隐藏）

export { default as Group } from './Group'
export { default as Slider } from './Slider'
export { default as Popover } from './Popover'
export { default as TableView } from './TableView'
export { default as Label } from './Label'


export * from './customHooks'
export * from './Wrapper'