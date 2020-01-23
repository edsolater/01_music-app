import React, { ReactElement, ComponentProps } from 'react'
import { ComponentRoot, Item } from '.'
import './List.scss'
import SlotScope from './SlotScope'

type ItemInfo = {
  label?: string
  [infoName: string]: any
}
function List(
  props: React.ComponentProps<typeof ComponentRoot> & {
    data: ItemInfo[]
    __ListItem: (ListItem: typeof SlotScope, info: ItemInfo) => ReactElement
  },
) {
  const { data, __ListItem: __Item, ...restProps } = props
  return (
    <ComponentRoot name='List' {...restProps}>
      {props.data.map((itemInfo, index) => (
        <__ListItem key={itemInfo.label ?? index} itemInfo={itemInfo} {...props} />
      ))}
    </ComponentRoot>
  )
}
const __ListItem = (
  props: {
    itemInfo: ItemInfo
  } & ComponentProps<typeof List>,
) => <SlotScope name='__ListItem' {...props.__ListItem(SlotScope, props.itemInfo).props} />
export default React.memo(List) as typeof List
