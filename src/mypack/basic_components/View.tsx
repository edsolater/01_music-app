import React, { CSSProperties, ReactNode, ReactElement } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import { Booleanish } from './types'

export type ViewPropType<O extends any> = {
  /**
   * 覆盖原生的className
   */
  className?: ClassValue
  /**
   * **特殊属性**
   * 类似于 vue 的 v-if
   */
  $if?: Booleanish
  /**
   * **特殊属性**
   * 类似于 vue 的 v-for 但没有keyProp的功能，需要请使用 <$$Control$$>  !!!注意，此时Ref不可获取（TODO）
   */
  $for?: O[]
  /**
   * **特殊属性**
   * 克隆自身 (接受数字(number/string)) !!!注意，此时Ref不可获取（TODO）
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
  children?: ReactNode | ((item: O, index: number) => ReactNode)
  /**
   * 在类型系统上暂且把ref当作一个props进行智能推断，实际上ref是要forwardRef的
   */
  ref?: any
  /**
   * 除className,style,onClick外的原生属性的
   */
  html?: JSX.IntrinsicElements['div']
}

export const ViewProp: (keyof ViewPropType<any>)[] = [
  'className',
  'style',
  'onClick',
  '$if',
  '$for',
  '$clone',
  'html',
  'children',
]

/**组件代码 */
function View<O>(props: ViewPropType<O>, ref: any): JSX.Element | null {
  if (props.$for) {
    return (
      <>
        {props.$for.map((item, itemIndex) =>
          props['$if'] ?? true ? (
            <div
              key={itemIndex /* TODO：暂时 */}
              ref={ref}
              className={classnames(props.className)}
              style={props.style}
              onClick={props.onClick}
              {...props.html}
            >
              {typeof props.children === 'function' && props.children?.(item, itemIndex)}
            </div>
          ) : null,
        )}
      </>
    )
  } else if (props.$clone) {
    const result: ReactNode[] = []
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
}
export default React.memo(React.forwardRef(View)) as <O>(
  props: ViewPropType<O>,
) => ReactElement | null // TOFIX：为了有generic的智能推断，出此下策。这是react的锅我不背。实际上也只要在最根本的View这么写就行了
