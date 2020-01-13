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
// TODO：需要添加group的逻辑
function Menu<D extends ItemData>({
  //为了使解析器识别generic的语法，不得不用function声明
  initIndex,
  data,
  __MenuItem__,
  __MenuGroup__,
  noGroup = false,
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
   * Menu对具体数据的渲染（函数传入data中的数据）
   */
  __MenuItem__: (dataItem: D, index: number) => ReactNode
  /**
   * Menu对编组的渲染
   */
  __MenuGroup__?: (group) => ReactNode
  /**
   * 不需要分组
   */
  noGroup?: boolean
  onSelectNewIndex?: (itemIndex: number) => any
}) {
  const selectedItemIndex = useMaster({
    type: 'number',
    init: initIndex,
  })
  return (
    <ComponentRoot name='Menu' {...restProps}>
      {data.map((data, index) => (
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
          {__MenuItem__(data, index)}
        </SlotScope>
      ))}
    </ComponentRoot>
  )
}

export default React.memo(Menu) as typeof Menu //为了使组件不丧失generic的能力
