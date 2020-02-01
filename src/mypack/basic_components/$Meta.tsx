import React, { Fragment, ReactNode } from 'react'

function $Meta<O, T = unknown>(props: {
  $for?: O[]
  /**
   * 格式化每个for循环
   */
  $formatter?: (item: O, index: number) => unknown
  /**
   * TODO：推断出formatter返回的类型，是**无奈之举**，以后能自动推断就好了
   */
  $formatterReturnType?: T
  keyProp?: (O extends object ? keyof O : any) | any
  children?: (computed: T extends {} ? T : O, index: number) => ReactNode
}) {
  return (
    <>
      {props.$for?.map((item, itemIndex) => (
        <Fragment
          key={
            props.keyProp && typeof item === 'object' && item !== null
              ? String(item[props.keyProp])
              : itemIndex
          }
        >
          {props.children?.(
            (props.$formatter ? props.$formatter(item, itemIndex) : item) as any,
            itemIndex,
          )}
        </Fragment>
      ))}
    </>
  )
}

export default React.memo($Meta) as typeof $Meta
