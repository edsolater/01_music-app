import React, { ReactNode } from 'react'

import './Menu.scss'
import { useMaster } from 'mypack/basic_components/customHooks'
import { ComponentRoot, SlotScope } from '.'

// TODO：需要添加group的逻辑
function Menu<NoGroup extends boolean | undefined = false>({
  //为了使解析器识别generic的语法，不得不用function声明
  initItemIndex = 0,
  initGroupIndex = 0,
  data,
  __MenuItem,
  __MenuGroup,
  noGroup = false,
  onSelectNewItem,
  onSelectNewGroup,
  ...restProps
}: React.ComponentProps<typeof ComponentRoot> & {
  /**
   * 初始化菜单项的index
   */
  initItemIndex?: number
  /**
   * 初始化菜单组的index
   */
  initGroupIndex?: number
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
  __MenuItem: (dataItem: AlbumMenuItem, itemIndex: number, groupIndex?: number) => ReactNode
  /**
   * Menu对编组的渲染
   */
  __MenuGroup?: (groupName: string, groupIndex: number, items: AlbumMenuItem[]) => ReactNode
  /**
   * 选择某个菜单项时发起的回调
   */
  onSelectNewItem?: ({
    itemIndex,
    item,
    groupIndex,
    group,
  }: {
    itemIndex: number
    item: AlbumMenuItem
    groupIndex?: number
    group?: string
    hasChangeGroup?: boolean
  }) => void
  //  TEMP
  onSelectNewGroup?: ({
    itemIndex,
    item,
    groupIndex,
    group,
  }: {
    itemIndex: number
    item: AlbumMenuItem
    groupIndex?: number
    group?: string
    hasChangeGroup?: boolean
  }) => void
}) {
  const masters = {
    selectedGroupIndex: useMaster({ type: 'number', init: initGroupIndex }),
    selectedItemIndex: useMaster({ type: 'number', init: initItemIndex }),
    selectedPath: useMaster({ type: 'stringPath', init: `${initGroupIndex}/${initItemIndex}` }),
  }
  return (
    <ComponentRoot name='Menu' {...restProps}>
      {noGroup === true
        ? (data as AlbumMenuItem[]).map((menuItem, itemIndex) => (
            <SlotScope
              name={['__MenuItem', { selected: itemIndex === masters.selectedItemIndex.value }]}
              key={menuItem.key ?? menuItem.id ?? itemIndex}
              onClick={() => {
                masters.selectedItemIndex.set(itemIndex)
                onSelectNewItem?.({ itemIndex, item: menuItem })
              }}
            >
              {__MenuItem(menuItem, itemIndex)}
            </SlotScope>
          )) //TODO: 想想分组的情况和不分组的情况怎么合并起来？
        : Object.entries(data as MenuGroupData).map(([groupName, items], groupIndex) => (
            <SlotScope
              name={[
                '__MenuGroup',
                { selected: `${groupIndex}` === masters.selectedPath.getPathPartFromRight(1) },
              ]}
              key={groupName}
            >
              {__MenuGroup?.(groupName, groupIndex, items)}
              {items.map((menuItem, itemIndex) => (
                <SlotScope
                  name={[
                    '__MenuItem',
                    {
                      selected: `${groupIndex}/${itemIndex}` === masters.selectedPath.value,
                      // itemIndex === masters.selectedItemIndex.value &&
                      // groupIndex === masters.selectedGroupIndex.value,
                    },
                  ]}
                  key={menuItem.key ?? menuItem.id ?? itemIndex}
                  onClick={() => {
                    // masters.selectedItemIndex.set(itemIndex)
                    // masters.selectedGroupIndex.set(groupIndex)
                    masters.selectedPath.forceSet(`${groupIndex}/${itemIndex}`)
                    onSelectNewItem?.({
                      itemIndex,
                      item: menuItem,
                      groupIndex: groupIndex,
                      group: groupName,
                    })
                    onSelectNewGroup?.({
                      itemIndex,
                      item: menuItem,
                      groupIndex: groupIndex,
                      group: groupName,
                    })
                  }}
                >
                  {__MenuItem(menuItem, itemIndex, groupIndex)}
                </SlotScope>
              ))}
            </SlotScope>
          ))}
    </ComponentRoot>
  )
}

export default React.memo(Menu) as typeof Menu //为了使组件不丧失generic的能力
