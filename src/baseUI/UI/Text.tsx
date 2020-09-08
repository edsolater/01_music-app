import React, { ComponentProps, forwardRef } from 'react'
import './Text.scss'
import View from './View'

function Text(
  props: ComponentProps<typeof View> & {
    /**
     * 是否显示在一行
     */
    line?: boolean
    block?: boolean
    /**
     * 大标题
     */
    largeTitle?: boolean
    /**
     * 标题一
     */
    h1?: boolean
    /**
     * 标题二
     */
    h2?: boolean
    /**
     * 标题三
     */
    h3?: boolean
    /**
     * 头条
     */
    h4?: boolean
    /**
     * 正文
     * 为了对称性这里写着，其实完全没有效果，相当于没写
     */
    body?: boolean
    /**
     * 标注
     */
    callout?: boolean
    /**
     * 副标题
     */
    subhead?: boolean
    /**
     * 注解
     */
    footnote?: boolean
    /**
     * 注释一
     */
    caption1?: boolean
    /**
     * 注释二
     */
    caption2?: boolean
    /**
     * 注释三
     */
    caption3?: boolean
  },
  ref
) {
  return (
    <View
      as='span'
      {...props}
      className={[
        props.className,
        'Text',
        {
          line: props.line,
          block: props.block,
          largeTitle: props.largeTitle,
          h1: props.h1,
          h2: props.h2,
          h3: props.h3,
          h4: props.h4,
          body: props.body, //为了对称性这里写着，其实完全没有效果，相当于没写
          callout: props.callout,
          subhead: props.subhead,
          footnote: props.footnote,
          caption1: props.caption1,
          caption2: props.caption2,
          caption3: props.caption3
        }
      ]}
      ref={ref}
    />
  )
}
export default forwardRef(Text)
