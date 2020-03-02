import React, { ReactNode } from 'react'
import { View, ViewPropType } from '.'
import { ClassValue } from 'classnames/types'

export type SlotPropType = ViewPropType & {
  slotName?: ClassValue
}

function Slot({
  slotName,
  className,
  ...restProps
}: ViewPropType & {
  /**
   * 用于各个组件定义组件的名字更方便
   */
  slotName?: ClassValue
}) {
  return <View className={[className, slotName]} {...restProps} />
}

export default React.memo(Slot) as typeof Slot

// 每个slot下，子组件所默认能携带的Prop
export type SlotElementPropType<SlotInfo extends object> = Omit<ViewPropType, 'children'> & {
  /**
   * 用于载入当前Slot时的信息，内部用Props，些业务逻辑时无需理会
   */
  $$passedOnPayload?: SlotInfo
  children?: (info: SlotInfo)=>ReactNode
}
