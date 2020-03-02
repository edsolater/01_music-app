import React from 'react'
import './Group.scss'
import { ClassValue } from 'classnames/types'
import { View, ViewPropType, ViewProp } from '.'
import { pick } from '../utils'

function Group(
  props: ViewPropType & {
    /**
     * 标识组名
     */
    groupName?: ClassValue
    column?: boolean //TODO
    /**
     * 表示组的方向，默认 row（横向）
     */
    groupDirection?: React.CSSProperties['flexDirection']
    /**
     * 是否需要分割线？不要的话最终代码会更简洁
     */
    noDivider?: boolean
  },
) {
  return (
    <View
      {...pick(props, ViewProp)}
      _componentName_='Group'
      className={[props.className, props.groupName]}
      style={{
        ...{ display: 'flex', flexDirection: props.groupDirection ?? 'row' },
        ...props.style,
      }}
    />
  )
}
export default React.memo(Group) as typeof Group
