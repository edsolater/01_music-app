import React, { ReactElement, ComponentProps, Fragment } from 'react'
import { ComponentRoot } from '.'
import './List.scss'
import SlotScope from './SlotScope'

type ItemInfo = {
  label?: string
  [infoName: string]: any
}
function List(
  props: React.ComponentProps<typeof ComponentRoot> & {
    data: ItemInfo[]
    __ListItem: (ListItem: typeof SlotScope, info: ItemInfo, index: number) => ReactElement
    __Between?: (Between: typeof SlotScope, info: ItemInfo, index: number) => ReactElement
  },
) {
  const { data, __ListItem: __List, __Between: _, ...restProps } = props //TODO: 这个解决方案不够简约
  return (
    <ComponentRoot name='List' {...restProps}>
      {props.data.map((itemInfo, index) => (
        <Fragment key={itemInfo.label ?? index}>
          <__ListItem itemInfo={itemInfo} index={index} {...props} />
          {props.__Between && props.data.length - 1 !== index && (
            <__Between itemInfo={itemInfo} index={index} {...props} />
          )}
        </Fragment>
      ))}
    </ComponentRoot>
  )
}
const __ListItem = (
  props: {
    itemInfo: ItemInfo
    index: number
  } & ComponentProps<typeof List>,
) => (
  <SlotScope
    name='__ListItem'
    {...props.__ListItem(SlotScope, props.itemInfo, props.index).props}
  />
)
const __Between = (
  props: {
    itemInfo: ItemInfo
    index: number
  } & ComponentProps<typeof List>,
) => (
  <SlotScope
    name='__Between'
    {...props.__Between?.(SlotScope, props.itemInfo, props.index).props}
  />
)
export default React.memo(List) as typeof List
