import React from 'react'
import View from './View'
import { ClassValue } from 'classnames/types'

/**
 * 为了简洁，完全抛弃slot组件
 */
function Slot({
  slotName,
  className,
  ...restProps
}: React.ComponentProps<typeof View> & {
  /**
   * 用于各个组件定义组件的名字更方便
   */
  slotName?: ClassValue
}) {
  return <View className={[className, slotName]} {...restProps} />
}

export default React.memo(Slot) as typeof Slot
