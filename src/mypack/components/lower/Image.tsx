import React, { ComponentProps } from 'react'
import { View } from '../wrappers'
import './Image.scss'

type IProps = ComponentProps<typeof View> & {
  /**
   * 除className,style,onClick外的原生属性的
   */
  html?: JSX.IntrinsicElements['img']
  /**
   * 特意提取出一个img的常用属性
   */
  src?: JSX.IntrinsicElements['img']['src']
}

const Image = React.forwardRef((props: IProps, ref: any) => (
  <View
    ref={ref}
    as='img'
    {...props}
    html={{ src: props.src, ...props.html } as any /* 强行不type推断，以提升速度 */}
  >
    {props.children}
  </View>
))
export default Image
