import React, { ComponentProps } from 'react'
import './Badge.scss'
import { View } from '.'

export default function Badge(
  props: ComponentProps<typeof View> & {
    /**
     * 隐藏红点（只是在视图上不可见）
     */
    hidden?: unknown
    /**
     * 红点上显式的数量
     */
    number?: number | string
  },
) {
  return (
    <View {...props} $componentName='Badge'>
      <View className={['__Dot', { _dot: !Number(props.number), _hidden: Boolean(props.hidden) }]}>
        {Number(props.number) > 0 && props.number}
      </View>
      {props.children}
    </View>
  )
}
