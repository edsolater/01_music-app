import React from 'react'
import { View } from '..'
import { ClassValue } from 'classnames/types'

function ComponentName({
  className,
  displayComponentName,
  ...restProps
}: React.ComponentProps<typeof View> & {
  /**
   * 用于各个组件定义组件的名字更方便
   */
  displayComponentName?: ClassValue
}) {
  return <View className={[className, displayComponentName]} {...restProps} />
}

export default React.memo(ComponentName) as typeof ComponentName
