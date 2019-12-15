import React from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import './ImageBox.less'

function Image({
  className,
  ...restProps
}: {
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
} & JSX.IntrinsicElements['img']) {
  return <img className={classnames(className, 'Image')} {...restProps} />
}

export default React.memo(Image) as typeof Image
