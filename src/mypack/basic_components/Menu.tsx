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
/**
 * TODO：这样的类型形式还是有点冗余，应该declare function 的
 */
type Props__Menu<NoGroup extends boolean | undefined = false> = React.ComponentProps<
  typeof ComponentRoot
> & {
  /**
   * 初始化菜单项的index
   */
  initItemIndex?: number
  /**
   * 初始化菜单组的index
   */
  initGroupIndex?: number
  /**
   * **必选项**
   * MenuList会使用的具体数据（Template定义渲染的样式）
   */
  data: NoGroup extends true ? AlbumMenuItem[] : MenuGroupData
  /**
   * 不需要分组
   */
  noGroup?: NoGroup
  /**
   * **必选项**
   * Menu对具体数据的渲染（函数传入data中的数据）
   */
  __MenuItem_Node: (itemInfo: MenuItemInfo) => ReactNode
  /**
   * 额外的props
   */
  __MenuItem_Props?: React.ComponentProps<typeof SlotScope>
  /**
   * Menu对编组的渲染
   */
  __MenuGroup_Node?: (groupInfo: MenuGroupInfo) => ReactNode
  /**
   * 额外的props
   */
  __MenuGroup_Props?:  React.ComponentProps<typeof SlotScope>
  /**
   * 选择某个菜单项时发起的回调
   */
  onSelectMenuItem?: (event: MenuItemInfo) => void
}
type Props__MenuItems = {
  currentPath: PathPiece
  items: AlbumMenuItem[]
  group?: MenuGroupInfo
  templateNode: React.ComponentProps<typeof Menu>['__MenuItem_Node']
  templateProps?: React.ComponentProps<typeof Menu>['__MenuItem_Props']
  onSelect?: (itemInfo: MenuItemInfo) => any
} 
type Props__MenuGroup = {
  allData: MenuGroupData
  currentGroupPath: PathPiece
  templateNode: React.ComponentProps<typeof Menu>['__MenuGroup_Node']
  templateProps?: React.ComponentProps<typeof Menu>['__MenuGroup_Props']
  children: (items: AlbumMenuItem[], group: MenuGroupInfo) => ReactNode
} 

function MenuItems({ currentPath, items, group, onSelect, templateNode: renderTemplate }: Props__MenuItems) {
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
function MenuGroup({ allData, currentGroupPath, templateNode: renderTemplate, children }: Props__MenuGroup) {
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
  initItemIndex = 0,
  initGroupIndex = 0,
  data,
  __MenuItem_Node,
  __MenuItem_Props,
  __MenuGroup_Node,
  __MenuGroup_Props,
  noGroup = false,
  onSelectMenuItem,
  children,
  ...restProps
}: Props__Menu<NoGroup>) {
  const selectedPath = useMaster({ type: 'stringPath', init: `${initGroupIndex}/${initItemIndex}` })
  return (
    <ComponentRoot name='Menu' {...restProps}>
      {children}
      {noGroup ? (
        <MenuItems
          currentPath={selectedPath.getPath()}
          items={data as AlbumMenuItem[]}
          templateNode={__MenuItem_Node}
          templateProps={__MenuItem_Props}
          onSelect={(itemInfo) => {
            selectedPath.set(`${itemInfo.groupIndex}/${itemInfo.itemIndex}`)
            onSelectMenuItem?.(itemInfo)
          }}
          />
          ) : (
            <MenuGroup
            allData={data as MenuGroupData}
            currentGroupPath={selectedPath.getPath(-2)}
            templateNode={__MenuGroup_Node}
            templateProps={__MenuGroup_Props}
            >
          {(items, menuGroupObj) => (
            <MenuItems
            currentPath={selectedPath.getPath()}
            items={items}
            group={menuGroupObj}
            templateNode={__MenuItem_Node}
            templateProps={__MenuItem_Props}
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
