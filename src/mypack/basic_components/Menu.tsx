import React, { ReactNode } from 'react'

import './Menu.scss'
import { useMaster } from 'mypack/basic_components/customHooks'
import { ComponentRoot, SlotScope } from '.'

type MenuItemInfo = {
  itemIndex: number
  item: AlbumMenuItem
  itemsInGroup: AlbumMenuItem[]
  currentMenuPath: string //TODO: 这里是不是应该是个完整的对象
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
  __MenuItems_node: (itemInfo: MenuItemInfo) => ReactNode
  /**
   * 额外的props
   */
  __MenuItems_props?: React.ComponentProps<typeof MenuItems>
  /**
   * Menu对编组的渲染
   */
  __MenuGroup_node?: (groupInfo: MenuGroupInfo) => ReactNode
  /**
   * 额外的props
   */
  __MenuGroup_props?:  React.ComponentProps<typeof MenuGroup>
  /**
   * 选择某个菜单项时发起的回调
   */
  onSelectMenuItem?: (event: MenuItemInfo) => void
}
type Props__MenuItems = {
  currentPath: PathPiece
  items: AlbumMenuItem[]
  group?: MenuGroupInfo
  __MenuItems_node: React.ComponentProps<typeof Menu>['__MenuItems_node']
  __MenuItems_props?: React.ComponentProps<typeof Menu>['__MenuItems_props']
  /** 
   * 回调：选择另一个菜单项
   */
  onSelectMenuItem?: (itemInfo: MenuItemInfo) => any
} & React.ComponentProps<typeof SlotScope>
type Props__MenuGroup = {
  allData: MenuGroupData
  currentGroupPath: PathPiece
  __MenuGroup_node: React.ComponentProps<typeof Menu>['__MenuGroup_node']
  __MenuGroup_props?: React.ComponentProps<typeof Menu>['__MenuGroup_props']
  children: (items: AlbumMenuItem[], group: MenuGroupInfo) => ReactNode
} & React.ComponentProps<typeof SlotScope>

function MenuItems({ currentPath, items, group, onSelectMenuItem: onSelect, __MenuItems_node: renderTemplate }: Props__MenuItems) {
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
function MenuGroup({ allData, currentGroupPath, __MenuGroup_node: renderTemplate, children }: Props__MenuGroup) {
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
  __MenuItems_node: __MenuItem_node,
  __MenuItems_props: __MenuItem_props,
  __MenuGroup_node,
  __MenuGroup_props,
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
          __MenuItems_node={__MenuItem_node}
          __MenuItems_props={__MenuItem_props}
          onSelectMenuItem={(itemInfo) => {
            selectedPath.set(`${itemInfo.groupIndex}/${itemInfo.itemIndex}`)
            onSelectMenuItem?.(itemInfo)
          }}
          />
          ) : (
            <MenuGroup
            allData={data as MenuGroupData}
            currentGroupPath={selectedPath.getPath(-2)}
            __MenuGroup_node={__MenuGroup_node}
            __MenuGroup_props={__MenuGroup_props}
            >
          {(items, menuGroupObj) => (
            <MenuItems
            currentPath={selectedPath.getPath()}
            items={items}
            group={menuGroupObj}
            __MenuItems_node={__MenuItem_node}
            __MenuItems_props={__MenuItem_props}
            onSelectMenuItem={(itemInfo) => {
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
