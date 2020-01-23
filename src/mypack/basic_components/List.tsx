import React, { ComponentProps, Fragment, ReactNode } from 'react'
import { ComponentRoot } from '.'
import './List.scss'
import { addClass } from 'mypack/utils'
import { useMaster } from './customHooks'

type ItemInfo = {
  label?: string
  [infoName: string]: any
}
function List(
  props: ComponentProps<typeof ComponentRoot> & {
    data: ItemInfo[]
    __ListItem: (info: ItemInfo, index: number, props: ComponentProps<typeof List>) => ReactNode
    __Between?: (info: ItemInfo, index: number, props: ComponentProps<typeof List>) => ReactNode
  },
) {
  const selectedIndex = useMaster({ type: 'number' })
  const { data, __ListItem: __List, __Between: _, ...restProps } = props //TODO: 这个解决方案不够简约
  const listLength = props.data.length
  return (
    <ComponentRoot name='List' {...restProps}>
      {props.data.map((itemInfo, index) => (
        <Fragment key={itemInfo.label ?? index}>
          {addClass(props.__ListItem(itemInfo, index, props), {
            heh: true,
            _selected: index === selectedIndex.getValue(),
          })}
          {index !== listLength - 1 && props.__Between?.(itemInfo, index, props)}
        </Fragment>
      ))}
    </ComponentRoot>
  )
}
export default React.memo(List) as typeof List
