import React, { ReactElement, ReactNode } from 'react'
import { ClassValue } from 'classnames/types'

export function addClass(target: ReactNode, extraClassName?: ClassValue) {
  if (extraClassName && target !== null && typeof target === 'object') {
    return React.cloneElement(target as ReactElement, {
      className: [(target as ReactElement).props.className, extraClassName],
    })
  }
  return target
}
