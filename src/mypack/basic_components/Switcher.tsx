import React from 'react'

import './Switcher.less'
import { ComponentName, View } from '.'

function Switcher({
  max = 1,
  value,
  defaultValue,
  onMoveTrigger,
  onMoveTriggerDone,
  ...restProps
}: React.ComponentProps<typeof ComponentName> & {
  /**
   * 总长度
   */
  max?: number
  /**
   * 当前所在位置 (初始值)
   */
  defaultValue?: number
  /**
   * 当前所在位置
   */
  value?: number
  /**
   * 只要拖动trigger的手柄就会触发这个事件，所以这个事件会触发多次
   */
  onMoveTrigger?: (currentSecond: number) => any
  /**
   * 只在最后触发一次
   */
  onMoveTriggerDone?: (currentSecond: number) => any
}) {
  return (
    <ComponentName name='Switcher' {...restProps}>
      <View className='slot'>
        <View className='trigger' />
      </View>
    </ComponentName>
  )
}

export default React.memo(Switcher) as typeof Switcher
