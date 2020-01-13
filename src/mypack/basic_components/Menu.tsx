import React, { ReactNode } from 'react'

import './Menu.scss'
import { useMaster } from 'mypack/basic_components/customHooks'
import { ComponentRoot, SlotScope } from '.'

type ItemData = {
  id?: string | number
  key?: string | number
  title?: string
  imageUrl?: string
  subtitle?: string
  detail?: string
  [titleName: string]: any
}

function Menu<D extends ItemData>({
  //为了使解析器识别generic的语法，不得不用function声明
  initIndex,
  data,
  __MenuItem__,
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
  __MenuItem__: (dataItem: D, index: number, array: D[]) => ReactNode
  onSelectNewIndex?: (itemIndex: number) => any
}) {
  const selectedItemIndex = useMaster({
    type: 'number',
    init: initIndex,
  })
  return (
    <ComponentRoot name='Menu' {...restProps}>
      {data.map((data, index, array) => (
        <SlotScope
          name={[
            '__MenuItem__',
            {
              selected: index === selectedItemIndex.value,
            },
          ]}
          key={data.key ?? data.id ?? index}
          onClick={() => {
            selectedItemIndex.set(index)
            onSelectNewIndex?.(index)
          }}
        >
          {__MenuItem__(data, index, array)}
        </SlotScope>
      ))}
    </ComponentRoot>
  )
}

export default React.memo(Menu) as typeof Menu //为了使组件不丧失generic的能力
