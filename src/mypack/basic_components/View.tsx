import React, { CSSProperties } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'

/**props定义 */
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
  onClick?: JSX.IntrinsicElements['div']['onClick']
  /**
   * 照搬<div> 的 children
   */
  children?: JSX.IntrinsicElements['div']['children']
  /**
   * 除className,style,onClick外的原生属性的
   */
  html?: JSX.IntrinsicElements['div']
}
export const propofView: (keyof IProps)[] = [
  'className',
  'style',
  'onClick',
  'hide',
  'html',
  'children',
]

/**组件代码 */
const View = React.forwardRef((props: IProps, ref: any): JSX.Element | null =>
  props.hide ? null : (
    <div
      ref={ref}
      className={classnames(props.className)}
      style={props.style}
      onClick={props.onClick}
      {...props.html}
    >
      {props.children}
    </div>
  ),
)
View.displayName = 'View'
export default React.memo(View) as typeof View
