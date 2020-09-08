import React, { ComponentProps } from 'react'
import View from './View'
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
  /**
   * TODO 只要输入URL，就加载资源
   */
  preload?: boolean
}

const Image = React.forwardRef((props: IProps, ref) => (
  <View
    ref={ref}
    as='img'
    {...props}
    originProps={
      {
        src: props.src,
        ...props.originProps
      } as any /* 强行不进项局部type推断，以提升整体类型推断的速度 */
    }
    className={[props.className, 'Image']}
  >
    {props.children}
  </View>
))
Image.displayName = 'Image'
export default Image
