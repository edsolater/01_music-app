import React, { ComponentProps, forwardRef } from 'react'
import './Text.scss'
import { View } from '../wrappers'

function Text(
  props: ComponentProps<typeof View> & {
    /**
     * 大标题
     */
    largeTitle?: boolean
    /**
     * 标题一
     */
    title1?: boolean
    /**
     * 标题二
     */
    title2?: boolean
    /**
     * 标题三
     */
    title3?: boolean
    /**
     * 头条
     */
    headline?: boolean
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
  ref,
) {
  return (
    <View
      as='span'
      $componentName={[
        'Text',
        {
          largeTitle: props.largeTitle,
          title1: props.title1,
          title2: props.title2,
          title3: props.title3,
          headline: props.headline,
          body: props.body, //为了对称性这里写着，其实完全没有效果，相当于没写
          callout: props.callout,
          subhead: props.subhead,
          footnote: props.footnote,
          caption1: props.caption1,
          caption2: props.caption2,
          caption3: props.caption3,
        },
      ]}
      {...props}
      ref={ref}
    />
  )
}
export default forwardRef(Text)
