import React, { ReactNode } from 'react'

import './Menu.scss'
import { useMaster } from 'mypack/basic_components/customHooks'
import { ComponentRoot, SlotScope } from '.'

// TODO：需要添加group的逻辑
function Menu<NoGroup extends boolean | undefined = false>({
  //为了使解析器识别generic的语法，不得不用function声明
  initIndex = 0,
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
  data: NoGroup extends true ? AlbumMenuItem[] : MenuGroupData
  /**
   * 不需要分组
   */
  noGroup?: NoGroup
  /**
   * Menu对具体数据的渲染（函数传入data中的数据）
   */
  __MenuItem__: (dataItem: AlbumMenuItem, itemIndex: number, groupIndex?: number) => ReactNode
  /**
   * Menu对编组的渲染
   */
  __MenuGroup__?: (groupName: string, groupIndex: number, items: AlbumMenuItem[]) => ReactNode
  /**
   * 选择某个菜单项时发起的回调
   */
  onSelectNewIndex?: (itemIndex: number) => void
}) {
  const selectedItemIndex = useMaster({ type: 'number', init: initIndex })
  return (
    <ComponentRoot name='Menu' {...restProps}>
      {noGroup
        ? (data as AlbumMenuItem[]).map((menuItem, itemIndex) => (
            <SlotScope
              name={['__MenuItem__', { selected: itemIndex === selectedItemIndex.value }]}
              key={menuItem.key ?? menuItem.id ?? itemIndex}
              onClick={() => {
                selectedItemIndex.set(itemIndex)
                onSelectNewIndex?.(itemIndex)
              }}
            >
              {__MenuItem__(menuItem, itemIndex)}
            </SlotScope>
          )) //TODO: 想想分组的情况和不分组的情况怎么合并起来？
        : Object.entries(data as MenuGroupData).map(([groupName, items], groupIndex) => (
            <SlotScope name='__MenuGroup__' key={groupName}>
              {__MenuGroup__?.(groupName, groupIndex, items)}
              {items.map((menuItem, itemIndex/* TODO:目前行为怪异 */) => (
                <SlotScope
                  name={['__MenuItem__', { selected: itemIndex === selectedItemIndex.value }]}
                  key={menuItem.key ?? menuItem.id ?? itemIndex}
                  onClick={() => {
                    selectedItemIndex.set(itemIndex)
                    onSelectNewIndex?.(itemIndex)
                  }}
                >
                  {__MenuItem__(menuItem, itemIndex, groupIndex)}
                </SlotScope>
              ))}
            </SlotScope>
          ))}
    </ComponentRoot>
  )
}

export default React.memo(Menu) as typeof Menu //为了使组件不丧失generic的能力
