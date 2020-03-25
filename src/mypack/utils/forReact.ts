import React, { ReactElement, ReactNode, DOMAttributes } from 'react'
import { ClassValue } from 'classnames/types'

//TODO- 这两个方法能不能合并
export function addClass(target: ReactNode, extraClassName: ClassValue) {
  if (target !== null && typeof target === 'object') {
    return React.cloneElement(target as ReactElement, {
      className: [(target as ReactElement).props.className, extraClassName],
    })
  } else {
    return target
  }
}

export function addEvent(
  target: ReactNode,
  eventName: keyof DOMAttributes<null>,
  eventCallback: (...anys: any[]) => any,
) {
  if (target !== null && typeof target === 'object') {
    const newEvent = (...any) => {
      ;(target as ReactElement).props[eventName]?.(...any)
      eventCallback(...any)
    }
    return React.cloneElement(target as ReactElement, {
      [eventName]: newEvent,
    })
  } else {
    return target
  }
}
