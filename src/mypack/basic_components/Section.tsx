import React from 'react'
import { View } from '.'

function Section({
  ...restProps
}: JSX.IntrinsicElements['section'] & React.ComponentProps<typeof View>) {
  return <View use='section' {...restProps}></View>
}
export default React.memo(Section) as typeof Section
