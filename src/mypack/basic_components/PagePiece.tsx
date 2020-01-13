import React from 'react'
import { Section } from '.'

function PagePiece({ className, ...restProps }: React.ComponentProps<typeof Section>) {
  return <Section className={[className, 'PagePiece']} {...restProps} />
}

export default React.memo(PagePiece) as typeof PagePiece
