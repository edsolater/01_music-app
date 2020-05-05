import React, { ComponentProps } from 'react'
import { View } from '.'

const mergeTwoProps = <T extends AnyObject, U extends AnyObject>(
  propsA: T,
  propsB: U,
): (T & U) | undefined => {
  const mergedProps: any = { ...propsA }
  for (const [key, valueB] of Object.entries(propsB)) {
    const valueA = mergedProps[key]
    if (typeof valueB === 'function' && typeof valueA === 'function') {
      mergedProps[key] = (...args) => {
        valueA(...args)
        valueB(...args)
      }
    } else if (key === 'className') {
      mergedProps[key] = [valueA, valueB]
    } else {
      mergedProps[key] = valueB
    }
  }
  return mergedProps
}

const mergeTwoPropsWithoutChildren = <T extends AnyObject, U extends AnyObject>(
  propsA: T,
  propsB: U,
): (T & U) | undefined => {
  const mergedProps: any = mergeTwoProps(propsA, propsB)
  delete mergedProps.children
  return mergedProps
}

/**
 * 并不实际渲染在DOM中，用于合并属性的
 */
export default function Slot(props: ComponentProps<typeof View> & {}) {
  if (React.isValidElement(props.children)) {
    return React.cloneElement(
      props.children,
      mergeTwoPropsWithoutChildren(props.children.props, props as AnyObject),
      props.children.props.children,
    )
  } else {
    // TODO 如果是String，这样返回是不是不合适
    return null
  }
}
