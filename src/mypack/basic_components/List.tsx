import React, { ReactElement, ComponentProps, Fragment } from 'react'
import { ComponentRoot, Divider } from '.'
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
        <Fragment key={itemInfo.label ?? index}>
          <__ListItem itemInfo={itemInfo} {...props} />
          {props.data.length - 1 !== index && <Divider />}
        </Fragment>
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
