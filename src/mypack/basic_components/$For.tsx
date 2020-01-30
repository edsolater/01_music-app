import React, { Fragment, ReactNode } from 'react'

function Meta<O extends any>(props: {
  $for?: O[]
  keyProp?: any
  children?: (item: O, index: number) => ReactNode
}) {
  return (
    <Fragment>
      {props.$for?.map((item, itemIndex) => (
        <Fragment
          key={
            props.keyProp && typeof item === 'object' && item !== null
              ? item[props.keyProp]
              : itemIndex
          }
        >
          {props.children?.(item, itemIndex)}
        </Fragment>
      ))}
    </Fragment>
  )
}

export default React.memo(Meta) as typeof Meta
