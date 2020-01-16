import React from 'react'
import { View } from '.'

function Image({
  ...restProps
}: JSX.IntrinsicElements['img'] & React.ComponentProps<typeof View>) {
  return <View use='img' {...restProps}></View>
}
export default React.memo(Image) as typeof Image
