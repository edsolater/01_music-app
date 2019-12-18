import React from 'react'
import View from '../View/View'
import { ClassValue } from 'classnames/types'

function SlotBox({
  slotName: className,
  slotName,
  ...restProps
}: React.ComponentProps<typeof View> & {
  /**
   * 用于各个组件定义组件的名字更方便
   */
  slotName?: ClassValue
}) {
  return <View slotName={[className, slotName]} {...restProps} />
}

export default React.memo(SlotBox) as typeof SlotBox
