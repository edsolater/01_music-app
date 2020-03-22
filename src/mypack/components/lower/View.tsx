import React, { CSSProperties, ReactNode, createElement } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
type HTMLTag = keyof React.ReactHTML
type IProp = {
  /**
   * 专为了创建组件使用的属性
   */
  $componentName?: ClassValue
  /**
   * html使用的标签明
   */
  $tag?: HTMLTag
  /**
   * 连接 css
   */
  className?: ClassValue
  /**
   * 内联样式
   */
  style?: CSSProperties
  /**
   * html5 标签属性，可以实现v-if的条件渲染
   */
  hidden?: unknown
  /**
   * 基础交互
   */
  onClick?: JSX.IntrinsicElements['div']['onClick']
  children?: ReactNode
  /**
   * 原生html属性
   */
  //TOFIX: 要只能推断所有HTMLTag，会奇慢无比。最好有选择性地推测而不是大而全地推测
  html?: JSX.IntrinsicElements['div' | 'img']
}

/**组件代码 */
function View(props: IProp, ref: any) {
  return createElement(
    props.$tag ?? 'div',
    {
      ref: ref,
      className: classnames(props.$componentName, props.className),
      style: props.style,
      onClick: props.onClick,
      hidden: Boolean(props.hidden),
      ...props.html,
    },
    props.children,
  )
}
export default React.forwardRef(View) // TOFIX：为了有generic的智能推断，出此下策。这是react的锅我不背。实际上也只要在最根本的View这么写就行了
