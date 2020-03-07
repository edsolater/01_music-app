import React, { ComponentProps } from 'react'

import './Switcher.scss'
import { View } from '..'

function Switcher(
  props: ComponentProps<typeof View> & {
    /**
     * 总长度
     */
    maxValue?: number
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
  },
) {
  return (
    <View {...props} $componentName='Switcher'>
      <View className='slot'>
        <View className='trigger' />
      </View>
    </View>
  )
}

export default React.memo(Switcher) as typeof Switcher
