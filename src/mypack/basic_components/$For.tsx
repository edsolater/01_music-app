import React, { Fragment, ReactNode } from 'react'

function $For<O, T = unknown>(props: {
  /**
   * 是否渲染所有子元素，等同于元素上的$if
   */
  $if?: (computed: T extends {} ? T : O, index: number) => unknown
  /**
   * 循环输出元素
   */
  $for?: O[]
  /**
   * 每个循环是否要渲染
   */
  $forif?: (computed: T extends {} ? T : O, index: number) => unknown
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
  if ('$if' in props && !props.$if) return null
  return (
    <>
      {props.$for?.map((item, itemIndex) => {
        if ('$forif' in props && !props.$forif) return null
        return (
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
        )
      })}
    </>
  )
}

export default React.memo($For) as typeof $For
