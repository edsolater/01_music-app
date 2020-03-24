import React, { ComponentProps } from 'react'
import { View } from '.'

function Slot(props: ComponentProps<typeof View> & {}) {
  if (props.children) return <View {...props} />
  else return null
}

export default React.memo(Slot) as typeof Slot
