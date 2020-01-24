import React, { ComponentProps, Fragment, ReactNode } from 'react'
import { ComponentRoot, Slot } from '.'
import './List.scss'
import { addClass, addEvent } from 'mypack/utils'
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
          <Slot
            slotName={['__ListItem', { _selected: index === selectedIndex.getValue() }]}
            onClick={() => {
              selectedIndex.set(index)
            }}
          >
            {props.__ListItem(itemInfo, index, props)}
          </Slot>
          {index !== listLength - 1 && props.__Between && (
            <Slot slotName='__Divider'>{props.__Between?.(itemInfo, index, props)}</Slot>
          )}
        </Fragment>
      ))}
    </ComponentRoot>
  )
}
export default React.memo(List) as typeof List
