import React, { ReactElement } from 'react'
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
   * 每个以ComponentRoot为根组件的组件都可以拥有，类似::before
   */

  __Header?: (HeaderComponent: typeof Header) => ReactElement
  /**
   * 每个以ComponentRoot为根组件的组件都可以拥有，类似::after
   */
  __Footer?: (FooterComponent: typeof Footer) => ReactElement
}) {
  return (
    <View className={[className, name]} {...restProps}>
      {__Header && <Header isPseudo {...__Header(Header).props} />}
      {children}
      {__Footer && <Footer isPseudo {...__Footer(Footer).props} />}
    </View>
  )
}

export default React.memo(ComponentRoot) as typeof ComponentRoot
