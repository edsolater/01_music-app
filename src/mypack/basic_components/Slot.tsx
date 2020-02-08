import React from 'react'
import { View, ViewPropType } from '.'
import { ClassValue } from 'classnames/types'

export type SlotPropType<O = {}> = ViewPropType<O> & {
  slotName?: ClassValue
}

function Slot<O>({
  slotName,
  className,
  ...restProps
}: ViewPropType<O> & {
  /**
   * 用于各个组件定义组件的名字更方便
   */
  slotName?: ClassValue
}) {
  return <View className={[className, slotName]} {...restProps} />
}

export default React.memo(Slot) as typeof Slot
