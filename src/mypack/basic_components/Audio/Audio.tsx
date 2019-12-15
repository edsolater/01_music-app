import React from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'

function Audio({
  className,
  ...restProps
}: Omit<JSX.IntrinsicElements['audio'], 'className'> & {
  className?: ClassValue
}) {
  return <audio className={classnames(className,'Audio')} {...restProps} />
}

export default React.memo(Audio) as typeof Audio