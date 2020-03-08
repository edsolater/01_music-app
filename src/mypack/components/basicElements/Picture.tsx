import React, { ComponentProps } from 'react'
import { Image } from '.'
import './Picture.scss'

export default function Picture(props: ComponentProps<typeof Image>) {
  return <Image $componentName='Picture' {...props} />
}
