import React from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'

function View({
  slotName: className,
  ...restProps
}: Omit<JSX.IntrinsicElements['div'], 'className'> & {
  slotName?: ClassValue
}) {
  return <div className={classnames(className)} {...restProps} />
}

export default React.memo(View) as typeof View