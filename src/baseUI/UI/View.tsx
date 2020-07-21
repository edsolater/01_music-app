import React, { CSSProperties, ReactNode, createElement, ForwardRefRenderFunction } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import { mergeCallbacks } from 'utils/reactComponent'
type HTMLTag = keyof React.ReactHTML

/**
 * _（下划线）开头的，只能在定义时使用。会自动合并到正式属性，优先级较低。
 */
const View: ForwardRefRenderFunction<
  any,
  {
    /**
     * html使用的标签明
     */
    as?: HTMLTag
    /**隐藏节点（使用HTML5的hidden属性） */
    hidden?: boolean

    className?: ClassValue
    _className?: ClassValue
    /**
     * 内联样式
     */
    style?: CSSProperties
    _style?: CSSProperties
    /**
     * 基础交互
     */
    onClick?: JSX.IntrinsicElements['div']['onClick']
    _onClick?: JSX.IntrinsicElements['div']['onClick']
    children?: ReactNode
    /**
     * 原生属性
     */
    //TOFIX: 要只能推断所有HTMLTag，会奇慢无比。最好有选择性地推测而不是大而全地推测
    originProps?: JSX.IntrinsicElements['div']
    _originProps?: JSX.IntrinsicElements['div']
  }
> = (props, ref) => {
  return createElement(
    props.as ?? 'div',
    {
      ref: ref,
      className: classnames(props.className, props._className) || undefined,
      style: { ...props._style, ...props.style },
      onClick: mergeCallbacks(props.onClick, props._onClick),
      hidden: props.hidden,
      //TODO 要能自动识别并merge “on”系列的回调
      ...props._originProps,
      ...props.originProps
    },
    props.children
  )
}
export default React.forwardRef(View) // TOFIX：为了有generic的智能推断，出此下策。这是react的锅我不背。实际上也只要在最根本的View这么写就行了
