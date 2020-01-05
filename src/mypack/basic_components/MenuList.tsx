import React, { ReactNode } from 'react'
import * as classnames from 'classnames'

import './MenuList.scss'
import { useMaster } from 'mypack/basic_components/customHooks'
import { View, ComponentRoot } from '.'

type ItemData = {
  id?: string | number
  key?: string | number
  title?: string
  imageUrl?: string
  subtitle?: string
  detail?: string
  [titleName: string]: any
}
function MenuList<D extends ItemData>({
  //为了使解析器识别generic的语法，不得不用function声明
  initIndex,
  data,
  ItemsTemplate,
  onSelectNewIndex,
  ...restProps
}: React.ComponentProps<typeof ComponentRoot> & {
  /**
   * 初始化选择的index
   */
  initIndex?: number
  /**
   * MenuList会使用的具体数据（Template定义渲染的样式）
   */
  data: D[]
  /**
   * MenuList对每条数据的渲染界面（函数传入data中的数据）
   */
  ItemsTemplate: (dataItem: D, index: number, array: D[]) => ReactNode
  onSelectNewIndex?: (itemIndex: number) => any
}) {
  const selectedItemIndex = useMaster({
    type: 'number',
    init: initIndex,
  })
  return (
    <ComponentRoot name='MenuList' {...restProps}>
      {data.map((data, index, array) => (
        <View
          className={classnames('Item', {
            selected: index === selectedItemIndex.value,
          })}
          key={data.key ?? data.id ?? index}
          onClick={() => {
            selectedItemIndex.set(index)
            onSelectNewIndex?.(index)
          }}
        >
          {ItemsTemplate(data, index, array)}
        </View>
      ))}
    </ComponentRoot>
  )
}

export default React.memo(MenuList) as typeof MenuList //为了使组件不丧失generic的能力
