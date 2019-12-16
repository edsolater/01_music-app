import React from 'react'
import { View } from '..'
import { ClassValue } from 'classnames/types'

function ComponentBox({
  className,
  componetName: componentClassName,
  ...restProps
}: React.ComponentProps<typeof View> & {
  /**
   * 用于各个组件定义组件的名字更方便
   */
  componetName?: ClassValue
}) {
  return <View className={[className, componentClassName]} {...restProps} />
}

export default React.memo(ComponentBox) as typeof ComponentBox
