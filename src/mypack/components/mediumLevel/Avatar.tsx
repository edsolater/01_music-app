import React, { ComponentProps } from 'react'
import { Image, View } from '..'
import './Avatar.scss'

function Avatar(
  props: ComponentProps<typeof View> & {
    src?: string
  },
) {
  return (
    <View {...props} $componentName='Avatar'>
      <Image src={props.src} />
    </View>
  )
}

export default React.memo(Avatar) as typeof Avatar
