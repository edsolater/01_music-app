import React from 'react'
import View from './View'
import { ClassValue } from 'classnames/types'

function Slot({
  name,
  className,
  invisiable = true,
  ...restProps
}: React.ComponentProps<typeof View> & {
  /**
   * 用于各个组件定义组件的名字更方便
   */
  name?: ClassValue
  /**
   * 这个组件是否是不可见的
   */
  invisiable?: boolean
}) {
  return invisiable ? <View className={[className, name]} {...restProps} /> : null
}

export default React.memo(Slot) as typeof Slot
