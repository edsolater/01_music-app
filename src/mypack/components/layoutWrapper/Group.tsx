import React, { ComponentProps } from 'react'
import './Group.scss'
import { View } from '..'

export default function Group(props: ComponentProps<typeof View>) {
  return (
    <View {...props} $componentName='Group'>
      {props.children}
    </View>
  )
}
