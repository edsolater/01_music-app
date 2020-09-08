import React, { ComponentProps } from 'react'
import Image from './Image'
import './Avatar.scss'

function Avatar(props: ComponentProps<typeof Image>) {
  return <Image {...props} className={[props.className, 'Avatar']} />
}

export default React.memo(Avatar) as typeof Avatar
