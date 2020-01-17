import React from 'react'
import { ComponentRoot } from '.'
import './Section.scss'

function Section({
  ...restProps
}: JSX.IntrinsicElements['section'] & React.ComponentProps<typeof ComponentRoot>) {
  return <ComponentRoot use='section'name='Section' {...restProps}></ComponentRoot>
}
export default React.memo(Section) as typeof Section
