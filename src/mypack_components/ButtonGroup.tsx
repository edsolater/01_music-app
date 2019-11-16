import React, { FC } from 'react'
import * as classnames from 'classnames'

/**
 * 为了书写结构更流畅
 */
const ButtonGroup: FC<{
  /**
   * 更具体的className
   */
  className?:
    | string
    | {
        [className: string]: boolean
      }
} & JSX.IntrinsicElements['div']> = ({ className, ...restProps }) => (
  <div className={classnames(className, 'ButtonGroup')} {...restProps}></div>
)
export default ButtonGroup
