import React from 'react'
import { View } from '..'
import { ClassValue } from 'classnames/types'

function ComponentName({
  slotName,
  componentName,
  ...restProps
}: React.ComponentProps<typeof View> & {
  /**
   * 用于各个组件定义组件的名字更方便
   */
  componentName?: ClassValue
}) {
  return <View slotName={[slotName, componentName]} {...restProps} />
}

export default React.memo(ComponentName) as typeof ComponentName
