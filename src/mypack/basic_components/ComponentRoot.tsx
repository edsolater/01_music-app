import React from 'react'
import { View } from '.'
import { ClassValue } from 'classnames/types'

function ComponentRoot({
  name,
  className,
  ...restProps
}: React.ComponentProps<typeof View> & {
  /**
   * 用于各个组件定义组件的名字更方便
   */
  name?: ClassValue
}) {
  return <View className={[className, name]} {...restProps} />
}

export default React.memo(ComponentRoot) as typeof ComponentRoot
