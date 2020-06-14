import React, { CSSProperties, ReactNode, createElement, ForwardRefRenderFunction } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
type HTMLTag = keyof React.ReactHTML

/**组件代码 */
const View: ForwardRefRenderFunction<
  any,
  {
    /**
     * html使用的标签明
     */
    as?: HTMLTag
    /**
     * 其实也是className， 只是专用于排版
     */
    layoutClass?: ClassValue
    className?: ClassValue
    /**
     * 内联样式
     */
    style?: CSSProperties
    /**
     * 基础交互
     */
    onClick?: JSX.IntrinsicElements['div']['onClick']
    children?: ReactNode
    hidden?: boolean
    /**
     * 原生html属性
     */
    //TOFIX: 要只能推断所有HTMLTag，会奇慢无比。最好有选择性地推测而不是大而全地推测
    html?: JSX.IntrinsicElements['div']
  }
> = (props, ref) => {
  return createElement(
    props.as ?? 'div',
    {
      ref: ref,
      className: classnames(props.className, props.layoutClass) || undefined,
      style: props.style,
      onClick: props.onClick,
      hidden: props.hidden,
      ...props.html
    },
    props.children
  )
}
export default React.forwardRef(View) // TOFIX：为了有generic的智能推断，出此下策。这是react的锅我不背。实际上也只要在最根本的View这么写就行了
