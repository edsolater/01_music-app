import React from 'react'
import { ClassValue } from 'classnames/types'
import { View } from '.'

function ComponentName({
  className: slotName,
  componentName,
  ...restProps
}: React.ComponentProps<typeof View> & {
  /**
   * 用于各个组件定义组件的名字更方便
   */
  componentName?: ClassValue
}) {
  return <View className={[slotName, componentName]} {...restProps} />
}

export default React.memo(ComponentName) as typeof ComponentName
