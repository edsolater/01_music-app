import React, { CSSProperties, ReactNode, ReactElement, createElement } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import { Booleanish } from './types'
type HTMLTag = keyof React.ReactHTML
type ViewProp<Tag extends HTMLTag = 'div'> = {
  /**
   * 专为了创建组件使用的属性
   */
  $componentName?: ClassValue
  /**
   * html使用的标签明
   */
  $tag?: Tag
  /**
   * 连接 css
   */
  className?: ClassValue
  /**
   * 条件渲染（影响子内容的渲染）
   */
  if?: Booleanish
  /**
   * 条件渲染（无关子内容的渲染）
   */
  when?: Booleanish
  /**
   * 内联样式
   */
  style?: CSSProperties
  /**
   * 基础交互
   */
  onClick?: JSX.IntrinsicElements[Tag]['onClick']
  children?: ReactNode
  /**
   * 在类型系统上暂且把ref当作一个props进行智能推断，实际上ref是要forwardRef的
   */
  ref?: any
  /**
   * 原生html属性
   */
  html?: JSX.IntrinsicElements[Tag]
}

/**组件代码 */
function View<Tag extends HTMLTag = 'div'>(props: ViewProp<Tag>, ref: any) {
  if (!(props.if ?? true)) return null
  if (!(props.when ?? true)) return <>{props.children}</>
  return createElement(
    props.$tag ?? 'div',
    {
      ref: ref,
      className: classnames(props.$componentName, props.className),
      style: props.style,
      onClick: props.onClick,
      ...props.html,
    },
    props.children,
  )
}
export default React.forwardRef(View) as <Tag extends HTMLTag = 'div'>(
  props: ViewProp<Tag>,
) => JSX.Element | null // TOFIX：为了有generic的智能推断，出此下策。这是react的锅我不背。实际上也只要在最根本的View这么写就行了
