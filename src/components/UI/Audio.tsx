import React, { ComponentProps } from 'react'
import { View } from '../wrappers'

type IProps = ComponentProps<typeof View> & {
  /**
   * 除className,style,onClick外的原生属性的
   */
  html?: JSX.IntrinsicElements['audio']
  /**
   * 特意提取出一个img的常用属性
   */
  src?: JSX.IntrinsicElements['audio']['src']
}

const Audio = React.forwardRef((props: IProps, ref: any) => (
  <View ref={ref} as='audio' html={{ src: props.src, ...props.html } as any}>
    {props.children}
  </View>
))
export default React.memo(Audio) as typeof Audio