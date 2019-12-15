import React from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import './Image.less'

function Image({
  className,
  componentClassName,
  ...restProps
}: Omit<JSX.IntrinsicElements['img'], 'className'> & {
  className?: ClassValue
  /**
   * 用于各个组件定义组件的名字更方便
   */
  componentClassName?: ClassValue
}) {
  return <img className={classnames(className, componentClassName, 'Image')} {...restProps} />
}

export default React.memo(Image) as typeof Image