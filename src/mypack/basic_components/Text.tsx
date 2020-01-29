import React from 'react'
import { ComponentRoot } from '.'
import './Text.scss'

function Text({
  largeTitle,
  title1,
  title2,
  title3,
  headline,
  body,
  callout,
  subhead,
  footnote,
  caption1,
  caption2,
  caption3,
  ...restProps
}: React.ComponentProps<typeof ComponentRoot> & {
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
}) {
  return (
    <ComponentRoot
      name={[
        'Text',
        {
          largeTitle,
          title1,
          title2,
          title3,
          headline,
          body, //为了对称性这里写着，其实完全没有效果，相当于没写
          callout,
          subhead,
          footnote,
          caption1,
          caption2,
          caption3,
        },
      ]}
      {...restProps}
    />
  )
}

export default React.memo(Text) as typeof Text
