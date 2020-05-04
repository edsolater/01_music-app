import React, { ComponentProps } from 'react'
import './Badge.scss'
import { View } from '../wrappers'

export default function Badge(
  props: ComponentProps<typeof View> & {
    /**
     * 隐藏红点（子元素依然显示）
     */
    transparent?: unknown
    /**
     * 红点上显式的数量
     */
    number?: number | string
  },
) {
  return (
    <View {...props} $componentName='Badge'>
      <View
        className={['Dot', { _dot: !Number(props.number), _hidden: Boolean(props.transparent) }]}
      >
        {Number(props.number) > 0 && props.number}
      </View>
      {props.children}
    </View>
  )
}
