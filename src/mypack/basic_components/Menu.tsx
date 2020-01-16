import React, { ReactNode } from 'react'

import './Menu.scss'
import { useMaster } from 'mypack/basic_components/customHooks'
import { ComponentRoot, SlotScope } from '.'

type MenuItemInfo = {
  itemIndex: number
  item: AlbumMenuItem
  path?: string
  groupIndex?: number
  group?: string
  hasChangeGroup?: boolean
}
type MenuGroupInfo = {
  group: string
  groupIndex: number
  itemsInThisGroup: AlbumMenuItem[]
}

function MenuItem({
  selected,
  template,
  infoObj,
  ...restProps
}: React.ComponentProps<typeof SlotScope> & {
  /**
   * 渲染模板
   */
  template: React.ComponentProps<typeof Menu>['__MenuItem']
  /**
   * 当前是否为选中状态
   */
  selected?: boolean
  /**
   * 由父组件传入的信息体
   */
  infoObj: MenuItemInfo
}) {
  return (
    <SlotScope name={['__MenuItem', { selected }]} {...restProps}>
      {template(infoObj)}
    </SlotScope>
  )
}

function MenuGroup({
  selected,
  template,
  infoObj,
  ...restProps
}: React.ComponentProps<typeof SlotScope> & {
  /**
   * 渲染模板
   */
  template: React.ComponentProps<typeof Menu>['__MenuGroup']
  /**
   * 当前是否为选中状态
   */
  selected?: boolean
  /**
   * 由父组件传入的信息体
   */
  infoObj: MenuGroupInfo
}) {
  return (
    <SlotScope name={['__MenuGroup', { selected }]} {...restProps}>
      {template?.(infoObj)}
      {restProps.children}
    </SlotScope>
  )
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
  __MenuItem: (itemInfo: MenuItemInfo) => ReactNode
  /**
   * Menu对编组的渲染
   */
  __MenuGroup?: (groupInfo: MenuGroupInfo) => ReactNode
  /**
   * 选择某个菜单项时发起的回调
   */
  onSelectMenuItem?: (event: MenuItemInfo) => void
}) {
  const masters = {
    selectedItemIndex: useMaster({ type: 'number', init: initItemIndex }),
    selectedPath: useMaster({ type: 'stringPath', init: `${initGroupIndex}/${initItemIndex}` }),
  }
  return (
    <ComponentRoot name='Menu' {...restProps}>
      {noGroup === true
        ? (data as AlbumMenuItem[]).map((menuItem, itemIndex) => (
          //TOFIX
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
        : Object.entries(data as MenuGroupData).map(([groupName, items], groupIndex) => {
            const menuGroupObj: MenuGroupInfo = {
              group: groupName,
              groupIndex: groupIndex,
              itemsInThisGroup: items,
            }
            return (
              <MenuGroup
                key={groupName}
                selected={`${groupIndex}` === masters.selectedPath.getPath(-2)}
                template={__MenuGroup}
                infoObj={menuGroupObj}
              >
                {items.map((menuItem, itemIndex) => {
                  const menuItemObj: MenuItemInfo = {
                    ...menuGroupObj,
                    ...{
                      path: masters.selectedPath.getPath(),
                      itemIndex,
                      item: menuItem,
                    },
                  }
                  return (
                    <MenuItem
                      key={`${groupIndex}/${itemIndex}`}
                      template={__MenuItem}
                      selected={`${groupIndex}/${itemIndex}` === masters.selectedPath.getPath()}
                      infoObj={menuItemObj}
                      onClick={() => {
                        masters.selectedPath.set(`${groupIndex}/${itemIndex}`)
                        onSelectMenuItem?.(menuItemObj)
                      }}
                    />
                  )
                })}
              </MenuGroup>
            )
          })}
    </ComponentRoot>
  )
}

export default React.memo(Menu) as typeof Menu //为了使组件不丧失generic的能力
