import React from 'react'
import './Group.scss'
import { ComponentRoot } from '.'
import { ClassValue } from 'classnames/types'

function Group({
  className,
  style,
  groupName,
  groupDirection = 'row',
  noDivider = false, //TODO
  ...restProps
}: React.ComponentProps<typeof ComponentRoot> & {
  /**
   * 标识组名
   */
  groupName?: ClassValue
  /**
   * 表示组的方向，默认 row（横向）
   */
  groupDirection?: React.CSSProperties['flexDirection']
  /**
   * 是否需要分割线？不要的话最终代码会更简洁
   */
  noDivider?: boolean
}) {
  return (
    <ComponentRoot
      name='Group'
      className={[className, groupName]}
      style={{ ...{ display: 'flex', flexDirection: groupDirection }, ...style }}
      {...restProps}
    />
  )
}
export default React.memo(Group) as typeof Group
