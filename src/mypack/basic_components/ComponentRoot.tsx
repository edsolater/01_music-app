import React, { ReactElement } from 'react'
import { View, Header, Footer } from '.'
import { ClassValue } from 'classnames/types'

const ComponentRoot = React.forwardRef(
  (
    {
      name,
      className,
      children,
      ...restProps
    }: React.ComponentProps<typeof View> & {
      /**
       * 用于各个组件定义组件的名字更方便
       */
      name?: ClassValue
    },
    ref,
  ) => {
    return (
      <View ref={ref} className={[className, name]} {...restProps}>
        {children}
      </View>
    )
  },
)
ComponentRoot.displayName = 'ComponentRoot'

export default React.memo(ComponentRoot) as typeof ComponentRoot
