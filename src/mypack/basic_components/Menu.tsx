import React, { ReactNode } from 'react'

import './Menu.scss'
import { useMaster } from 'mypack/basic_components/customHooks'
import { ComponentRoot, SlotScope } from '.'

type MenuItemInfo = {
  itemIndex: number
  item: AlbumMenuItem
  itemsInGroup: AlbumMenuItem[]
  currentMenuPath: string
  groupIndex?: number
  group?: AlbumMenuGroup
  hasChangeGroup?: boolean
}
type MenuGroupInfo = {
  group: AlbumMenuGroup
  groupIndex: number
  itemsInThisGroup: AlbumMenuItem[]
}

type PathPiece = string //Temp
function MenuItems({
  currentPath,
  items,
  group,
  onSelect,
  renderTemplate,
}: {
  currentPath: PathPiece //TEMP
  items: AlbumMenuItem[]
  group?: MenuGroupInfo
  renderTemplate: React.ComponentProps<typeof Menu>['__MenuItem']
  onSelect?: (itemInfo: MenuItemInfo) => any
}) {
  return (
    <>
      {items.map((menuItem, itemIndex) => {
        const itemInfo: MenuItemInfo = {
          ...group,
          ...{
            currentMenuPath: currentPath,
            itemIndex,
            item: menuItem,
            itemsInGroup: items,
          },
        }
        return (
          <SlotScope
            key={itemInfo.item.title}
            name={[
              '__MenuItem',
              { selected: `${group?.groupIndex ?? 0}/${itemIndex}` === currentPath },
            ]}
            onClick={() => onSelect?.(itemInfo)}
          >
            {renderTemplate(itemInfo)}
          </SlotScope>
        )
      })}
    </>
  )
}

function MenuGroup({
  allData,
  currentGroupPath,
  renderTemplate,
  children,
}: {
  allData: MenuGroupData
  currentGroupPath: PathPiece //Temp
  renderTemplate: React.ComponentProps<typeof Menu>['__MenuGroup']
  children: (items: AlbumMenuItem[], group: MenuGroupInfo) => ReactNode
}) {
  return (
    <>
      {Object.entries(allData).map(([groupName, items], groupIndex) => {
        const groupInfo: MenuGroupInfo = {
          group: { title: groupName },
          groupIndex: groupIndex,
          itemsInThisGroup: items,
        }
        return (
          <SlotScope
            key={groupInfo.group.title}
            name={['__MenuGroup', { selected: `${groupIndex}` === currentGroupPath }]}
          >
            {renderTemplate?.(groupInfo)}
            {children(items, groupInfo)}
          </SlotScope>
        )
      })}
    </>
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
  const selectedPath = useMaster({ type: 'stringPath', init: `${initGroupIndex}/${initItemIndex}` })
  return (
    <ComponentRoot name='Menu' {...restProps}>
      {noGroup ? (
        <MenuItems
          currentPath={selectedPath.getPath()}
          items={data as AlbumMenuItem[]}
          renderTemplate={__MenuItem}
          onSelect={(itemInfo) => {
            selectedPath.set(`${itemInfo.groupIndex}/${itemInfo.itemIndex}`)
            onSelectMenuItem?.(itemInfo)
          }}
        />
      ) : (
        <MenuGroup
          allData={data as MenuGroupData}
          currentGroupPath={selectedPath.getPath(-2)}
          renderTemplate={__MenuGroup}
        >
          {(items, menuGroupObj) => (
            <MenuItems
              currentPath={selectedPath.getPath()}
              items={items}
              group={menuGroupObj}
              renderTemplate={__MenuItem}
              onSelect={(itemInfo) => {
                selectedPath.set(`${itemInfo.groupIndex}/${itemInfo.itemIndex}`)
                onSelectMenuItem?.(itemInfo)
              }}
            />
          )}
        </MenuGroup>
      )}
    </ComponentRoot>
  )
}

export default React.memo(Menu) as typeof Menu //为了使组件不丧失generic的能力
