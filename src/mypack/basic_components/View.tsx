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
  '$if',
  '$for',
  'html',
  'children',
]

/**组件代码 */
const View = React.forwardRef((props: IProps, ref: any): JSX.Element | null =>
  props['$if'] ?? true ? (
    <div
      ref={ref}
      className={classnames(props.className)}
      style={props.style}
      onClick={props.onClick}
      {...props.html}
    >
      {props.children}
    </div>
  ) : null,
)
View.displayName = 'View'
export default React.memo(View) as typeof View
