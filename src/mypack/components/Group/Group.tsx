import React from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'

import './Group.less'

/**
 * 多半是没有必要的
 */
function Group({
  className,
  ...restProps
}: {
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
} & JSX.IntrinsicElements['div']) {
  return <div className={classnames(className, 'Group')} {...restProps}></div>
}
export default React.memo(Group) as typeof Group
