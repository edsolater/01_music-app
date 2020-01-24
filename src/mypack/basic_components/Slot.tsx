import React from 'react'
import View from './View'
import { ClassValue } from 'classnames/types'

/**
 * @deprecated
 * 为了简洁，完全抛弃slot组件
 */
function Slot({
  slotName,
  className,
  visiable = true,
  ...restProps
}: React.ComponentProps<typeof View> & {
  /**
   * 用于各个组件定义组件的名字更方便
   */
  slotName?: ClassValue
  /**
   * 这个组件是否是不可见的
   */
  visiable?: any
}) {
  return visiable ? <View className={[className, slotName]} {...restProps} /> : null
}

export default React.memo(Slot) as typeof Slot
