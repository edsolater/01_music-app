import React, { ComponentProps } from 'react'
import './Badge.scss'
import { Text, View } from '.'

/**
 * 父元素不能定义overflow:hidden
 * 该子元素必须排在父元素的所有非Wrapper子元素之前
 */
function Badge(
  props: ComponentProps<typeof View> & {
    /**
     * 隐藏红点（视图上不可见）
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
      {/* TODO:使用::before/::after会更干净 */}
      <View className={['__Dot', { _dot: !Number(props.number), _hidden: Boolean(props.hidden) }]}>
        <Text if={Number(props.number) > 0}>{props.number}</Text>
      </View>
      {props.children}
    </View>
  )
}

export default React.memo(Badge) as typeof Badge
