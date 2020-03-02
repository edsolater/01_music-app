import React from 'react'
import { Image, View, ViewProp, ViewPropType } from '.'
import './Avatar.scss'
import { pick } from '../utils'

function Avatar(
  props: ViewPropType & {
    src?: string
  },
) {
  return (
    <View {...pick(props, ViewProp)} _componentName_='Avatar'>
      <Image src={props.src} />
    </View>
  )
}

export default React.memo(Avatar) as typeof Avatar
