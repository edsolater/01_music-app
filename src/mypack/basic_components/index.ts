// 为了能够使用 autoImport 能力
export { default as View } from './View/View'
export { default as Text } from './Text/Text'
export { default as Image } from './Image/Image'

export { default as ComponentName } from './ComponentName/ComponentName'
export { default as SlotName } from './SlotName/SlotName'

export { default as __ComponentCanTap } from './__ComponentCanTap/__ComponentCanTap' // "__ComponentCan"/"can" 开头表示一种能力 //只是个语义化包装
export { default as CanTap } from './CanTap/CanTap' // __ComponentCanTap的 “显式版”（"__"前缀的需在devTool中隐藏）
export { default as Button } from './Button/Button' // __ComponentCanTap的典型应用

export { default as __ComponentCanSwitchStatus } from './__ComponentCanSwitchStatus/__ComponentCanSwitchStatus'
export { default as CanSwitchStatus } from './CanSwitchStatus/CanSwitchStatus' // __ComponentCanSwitchStatus “显式版”（"__"前缀的需在devTool中隐藏）

export { default as Group } from './Group/Group'
export { default as Slider } from './Slider/Slider'
export { default as Popover } from './Popover/Popover'
export { default as TableView } from './TableView/TableView'
export { default as Label } from './Label/Label'
export * from './__customHooks'
