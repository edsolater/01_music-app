import React, { ReactNode } from 'react'
import { View, Header, Footer } from '.'
import { ClassValue } from 'classnames/types'

function ComponentRoot({
  name,
  className,
  __Header,
  children,
  __Footer,
  ...restProps
}: React.ComponentProps<typeof View> & {
  /**
   * 用于各个组件定义组件的名字更方便
   */
  name?: ClassValue
  /**
   * 每个以ComponentRoot为根组件的组件都可以拥有
   */
  __Header?: ReactNode
  /**
   * 每个以ComponentRoot为根组件的组件都可以拥有
   */
  __Footer?: ReactNode
}) {
  return (
    <View className={[className, name]} {...restProps}>
      {__Header && <Header>{__Header}</Header>}
      {children}
      {__Footer && <Footer>{__Footer}</Footer>}
    </View>
  )
}

export default React.memo(ComponentRoot) as typeof ComponentRoot
