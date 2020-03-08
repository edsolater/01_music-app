import React, { ComponentProps } from 'react'
import { Image } from '.'
import './Avatar.scss'

function Avatar(props: ComponentProps<typeof Image>) {
  return <Image $componentName='Avatar' {...props} />
}

export default React.memo(Avatar) as typeof Avatar
