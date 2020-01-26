import React, { CSSProperties } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import './Image.scss'

type IProps = {
  /**
   * 覆盖原生的className
   */
  className?: ClassValue
  /**
   * **特殊属性**
   * 类似于 vue 的 v-if 反义（如果怎么怎么样，就隐藏）
   */
  hide?: any
  /**
   * 照搬<div> 的style
   */
  style?: CSSProperties
  /**
   * 照搬<div> 的onClick
   */
  onClick?: JSX.IntrinsicElements['img']['onClick']
  /**
   * 照搬<div> 的 children
   */
  children?: JSX.IntrinsicElements['img']['children']
  /**
   * 除className,style,onClick外的原生属性的
   */
  html?: JSX.IntrinsicElements['img']
  /**
   * 注意： 这个属性是div所没有的
   */
  src?: JSX.IntrinsicElements['img']['src']
}

const Image = React.forwardRef((props: IProps, ref): JSX.Element | null =>
  props.hide ? null : (
    <img src={props.src} className={classnames(props.className)} style={props.style} onClick={props.onClick} {...props.html}>
      {props.children}
    </img>
  ),
)
Image.displayName = 'Image'
export default React.memo(Image) as typeof Image
