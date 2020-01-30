import React, { CSSProperties, Fragment, ReactNode } from 'react'
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
   * 类似于 vue 的 v-for (接受数字(number/string)) !!!注意，此时Ref不可获取（TODO）
   */
  $clone?: number | string
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
  children?: any
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
  '$clone',
  'html',
  'children',
]

/**组件代码 */
const View = React.forwardRef((props: IProps, ref: any): JSX.Element | null => {
  if (props.$clone) {
    const result: (JSX.Element | null)[] = []
    for (let i = 0; i < Number(props.$clone); i++) {
      result.push(
        props['$if'] ?? true ? (
          <div
            key={i /* TODO：暂时 */}
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
    }
    return <>{result}</>
  } else {
    return props['$if'] ?? true ? (
      <div
        ref={ref}
        className={classnames(props.className)}
        style={props.style}
        onClick={props.onClick}
        {...props.html}
      >
        {props.children}
      </div>
    ) : null
  }
})
View.displayName = 'View'
export default React.memo(View) as typeof View
