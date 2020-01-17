import React, { ReactNode } from 'react'
import { View, Header, Footer } from '.'
import { ClassValue } from 'classnames/types'

function ComponentRoot({
  name,
  className,
  __Header_node,
  __Header_props,
  children,
  __Footer_node,
  __Footer_props,
  ...restProps
}: React.ComponentProps<typeof View> & {
  /**
   * 用于各个组件定义组件的名字更方便
   */
  name?: ClassValue
  /**
   * 每个以ComponentRoot为根组件的组件都可以拥有，类似::before
   */
  __Header_node?: ReactNode
  __Header_props?: React.ComponentProps<typeof Header>
  /**
   * 每个以ComponentRoot为根组件的组件都可以拥有，类似::after
   */
  __Footer_node?: ReactNode
  __Footer_props?: React.ComponentProps<typeof Footer>
}) {
  return (
    <View className={[className, name]} {...restProps}>
      {__Header_node && <Header {...__Header_props}>{__Header_node}</Header>}
      {children}
      {__Footer_node && <Footer {...__Footer_props}>{__Footer_node}</Footer>}
    </View>
  )
}

export default React.memo(ComponentRoot) as typeof ComponentRoot
