import React, { CSSProperties, ReactNode, ReactElement } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import { Booleanish } from './types'

export type ViewPropType = {
  /**
   * 覆盖原生的className
   */
  className?: ClassValue
  /**
   * **特殊属性**
   * 类似于 vue 的 v-if
   */
  if?: Booleanish
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
  children?: ReactNode
  /**
   * 在类型系统上暂且把ref当作一个props进行智能推断，实际上ref是要forwardRef的
   */
  ref?: any
  /**
   * 除className,style,onClick外的原生属性的
   */
  html?: JSX.IntrinsicElements['div']
}

export const ViewProp: (keyof ViewPropType)[] = [
  'className',
  'style',
  'onClick',
  'if',
  'html',
  'children',
]

/**组件代码 */
function View(props: ViewPropType, ref: any): JSX.Element | null {
  if (!(props.if ?? true)) return null
  return (
    <div
      ref={ref}
      className={classnames(props.className)}
      style={props.style}
      onClick={props.onClick}
      {...props.html}
    >
      {props.children}
    </div>
  )
}
export default React.forwardRef(View) as (props: ViewPropType) => ReactElement | null // TOFIX：为了有generic的智能推断，出此下策。这是react的锅我不背。实际上也只要在最根本的View这么写就行了
