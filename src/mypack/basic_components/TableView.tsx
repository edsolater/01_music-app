import React, { ReactNode } from 'react'
import * as classnames from 'classnames'

import './TableView.scss'
import { useMaster } from 'mypack/basic_components/customHooks'
import { View, ComponentRoot } from '.'

type Data = {
  id?: string | number
  key?: string | number
  title?: string
  imageUrl?: string
  subtitle?: string
  detail?: string
  [titleName: string]: any
}
function TableView<D extends Data>({
  //为了使解析器识别generic的语法，不得不用function声明
  initIndex,
  data,
  Slot_Item,
  onClickItem,
  ...restProps
}: React.ComponentProps<typeof ComponentRoot> & {
  /**
   * 初始化选择的index
   */
  initIndex?: number
  /**
   * TableView会使用的具体数据（Template定义渲染的样式）
   */
  data: D[]
  /**
   * TableView对每条数据的渲染界面（函数传入data中的数据）
   */
  Slot_Item: (dataItem: D, index: number, array: typeof dataItem[]) => ReactNode
  onClickItem?: (dataItem: D, index: number, array: typeof dataItem[]) => any
}) {
  const selectedItemIndex = useMaster({
    type: 'index-recorder',
    init: initIndex,
  })
  return (
    <ComponentRoot name='TableView' {...restProps}>
      {data.map((data, index, array) => (
        <View
          className={classnames('Item', {
            selected: index === selectedItemIndex.value,
          })}
          key={data.key ?? data.id ?? index}
          onClick={() => {
            selectedItemIndex.set(index)
            onClickItem?.(data, index, array)
          }}
        >
          {Slot_Item(data, index, array)}
        </View>
      ))}
    </ComponentRoot>
  )
}

export default React.memo(TableView) as typeof TableView //为了使组件不丧失generic的能力
