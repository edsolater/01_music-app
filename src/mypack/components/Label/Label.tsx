import React from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'

import './Label.less'
function Label({
  className,
  text,
  children,
  ...restProps
}: {
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  text?: string
} & JSX.IntrinsicElements['div']) {
return <div className={classnames(className, 'Label')} {...restProps}>{text ?? children}</div>
}

export default React.memo(Label) as typeof Label //为了使组件不丧失generic的能力
