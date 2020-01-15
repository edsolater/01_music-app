import React, { ReactNode } from 'react'

import './Menu.scss'
import { useMaster } from 'mypack/basic_components/customHooks'
import { ComponentRoot, SlotScope } from '.'

type ItemInfo = {
  itemIndex: number
  item: AlbumMenuItem
  path?: string
  groupIndex?: number
  group?: string
  hasChangeGroup?: boolean
}

// TODO：需要添加group的逻辑
function Menu<NoGroup extends boolean | undefined = false>({
  //为了使解析器识别generic的语法，不得不用function声明
  initItemIndex = 0,
  initGroupIndex = 0,
  data,
  __MenuItem,
  __MenuGroup,
  noGroup = false,
  onSelectMenuItem,
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
  __MenuItem: (itemInfo: ItemInfo) => ReactNode
  /**
   * Menu对编组的渲染
   */
  __MenuGroup?: (groupName: string, groupIndex: number, items: AlbumMenuItem[]) => ReactNode
  /**
   * 选择某个菜单项时发起的回调
   */
  onSelectMenuItem?: (event: ItemInfo) => void
}) {
  const masters = {
    selectedItemIndex: useMaster({ type: 'number', init: initItemIndex }),
    selectedPath: useMaster({ type: 'stringPath', init: `${initGroupIndex}/${initItemIndex}` }),
  }
  return (
    <ComponentRoot name='Menu' {...restProps}>
      {noGroup === true
        ? (data as AlbumMenuItem[]).map((menuItem, itemIndex) => (
            <SlotScope
              name={[
                '__MenuItem',
                { selected: String(itemIndex) === masters.selectedPath.getPath(-1) },
              ]}
              key={menuItem.key ?? menuItem.id ?? itemIndex}
              onClick={() => {
                masters.selectedPath.set(itemIndex)
                onSelectMenuItem?.({ itemIndex, item: menuItem })
              }}
            >
              {__MenuItem({ item: menuItem, itemIndex })}
            </SlotScope>
          )) //TODO: 想想分组的情况和不分组的情况怎么合并起来？
        : Object.entries(data as MenuGroupData).map(([groupName, items], groupIndex) => (
            <SlotScope
              key={groupName}
              name={[
                '__MenuGroup',
                { selected: `${groupIndex}` === masters.selectedPath.getPath(-2) },
              ]}
            >
              {__MenuGroup?.(groupName, groupIndex, items)}
              {items.map((menuItem, itemIndex) => (
                <SlotScope
                  key={menuItem.key ?? menuItem.id ?? itemIndex}
                  name={[
                    '__MenuItem',
                    { selected: `${groupIndex}/${itemIndex}` === masters.selectedPath.getPath() },
                  ]}
                  onClick={() => {
                    masters.selectedPath.set(`${groupIndex}/${itemIndex}`)
                    onSelectMenuItem?.({
                      path: masters.selectedPath.getPath(),
                      itemIndex,
                      item: menuItem,
                      groupIndex: groupIndex,
                      group: groupName,
                    })
                  }}
                >
                  {__MenuItem({ item: menuItem, itemIndex, group: groupName, groupIndex })}
                </SlotScope>
              ))}
            </SlotScope>
          ))}
    </ComponentRoot>
  )
}
function MenuItem({
  selected,
  template,
  ...restProps
}: {
  /**
   * 渲染模板
   */
  template: React.ComponentProps<typeof Menu>['__MenuItem']
  /**
   * 当前是否为选中状态
   */
  selected?: boolean
}) {
  return (
    <SlotScope name={['__MenuItem', { selected }]} {...restProps}>
      {}
    </SlotScope>
  )
}
export default React.memo(Menu) as typeof Menu //为了使组件不丧失generic的能力
