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
   * 类似于 vue 的 v-if
   */
  $if?: any
  /**
   * **特殊属性**
   * 类似于 vue 的 v-for
   */
  $for?: any
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

//TODO: Image要能依托于View，不然维护太烦
const Image = React.forwardRef((props: IProps, ref: any): JSX.Element | null =>
  props['$if'] ?? true ? (
    <img
      ref={ref}
      src={props.src}
      className={classnames(props.className)}
      style={props.style}
      onClick={props.onClick}
      {...props.html}
    >
      {props.children}
    </img>
  ) : null,
)
Image.displayName = 'Image'
export default React.memo(Image) as typeof Image
