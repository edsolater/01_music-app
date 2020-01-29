import React, { ReactNode, ComponentProps } from 'react'

import './Menu.scss'
import { useMaster } from 'mypack/basic_components/customHooks'
import { ComponentRoot, Slot } from '.'
/**
 * TODO: Menu会引起Typescript的类型推断崩溃，肯定有什么问题（答：类型继承用得太过复杂）
 * TODO：这个Menu组件的内聚性打散了，太过复杂，必须重写
 */
type MenuItemInfo = {
  itemIndex: number
  item: AlbumMenuItem
  itemsInGroup: AlbumMenuItem[]
  currentMenuPath: string //TODO: 这里是不是应该是个完整的对象 //TODO: 这里的值不应该由没有意义的数字组成
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
 * TODO2: 最终是要专门写个网页介绍各个组件的传参的，这样是不是反而没有必要？
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
   * 出现在Menu头部位置
   */
  __MenuHeader?: (allProps: ComponentProps<typeof Menu>, currentPath: PathPiece) => ReactNode
  /**
   * **必选项**
   * Menu对具体数据的渲染（函数传入data中的数据）
   */
  __MenuItem: (itemInfo: MenuItemInfo) => ReactNode
  /**
   * Menu对编组的渲染
   */
  __MenuGroup?: (groupInfo: MenuGroupInfo) => ReactNode
  /**
   * 分割线位置
   */
  __BetweenItems?: (itemIndex: number, itemInfo: MenuItemInfo) => ReactNode
  /**
   * 选择某个菜单项时发起的回调
   */
  onSelectMenuItem?: (event: MenuItemInfo) => void
}
type Props__MenuItems = {
  currentPath: PathPiece
  items: AlbumMenuItem[]
  group?: MenuGroupInfo
  __BetweenItems?: React.ComponentProps<typeof Menu>['__BetweenItems']
  __MenuItem?: React.ComponentProps<typeof Menu>['__MenuItem']
  /**
   * 回调：选择另一个菜单项
   */
  onSelectMenuItem?: (itemInfo: MenuItemInfo) => any
} & React.ComponentProps<typeof Slot>
type Props__MenuGroup = {
  allData: MenuGroupData
  currentGroupPath: PathPiece
  __MenuGroup?: React.ComponentProps<typeof Menu>['__MenuGroup']
  children: (items: AlbumMenuItem[], group: MenuGroupInfo) => ReactNode
} & React.ComponentProps<typeof Slot>

function Menu(props: Props__Menu) {
  const {
    initItemIndex = 0,
    initGroupIndex = 0,
    data,
    __MenuHeader,
    __MenuItem,
    __MenuGroup,
    __BetweenItems,
    noGroup = false,
    onSelectMenuItem,
    children,
    ...restProps
  } = props
  const selectedPath = useMaster({ type: 'stringPath', init: `${initGroupIndex}/${initItemIndex}` })
  return (
    <ComponentRoot name='Menu' {...restProps}>
      {children}
      {props.__MenuHeader?.(props, selectedPath.getPath())}
      {noGroup ? (
        <MenuItems
          currentPath={selectedPath.getPath()}
          items={(data as unknown) as AlbumMenuItem[]}
          __MenuItem={__MenuItem}
          __BetweenItems={__BetweenItems}
          onSelectMenuItem={(itemInfo) => {
            selectedPath.set(`${itemInfo.groupIndex}/${itemInfo.itemIndex}`)
            onSelectMenuItem?.(itemInfo)
          }}
        />
      ) : (
        <MenuGroup
          allData={(data as unknown) as MenuGroupData}
          currentGroupPath={selectedPath.getPath(-2)}
          __MenuGroup={__MenuGroup}
        >
          {(items, menuGroupObj) => (
            <MenuItems
              currentPath={selectedPath.getPath()}
              items={items}
              group={menuGroupObj}
              __MenuItem={__MenuItem}
              __BetweenItems={__BetweenItems}
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
function MenuGroup({ allData, currentGroupPath, __MenuGroup, children }: Props__MenuGroup) {
  const amount = Object.entries(allData).length
  return (
    <>
      {Object.entries(allData).map(([groupName, items], groupIndex) => {
        const groupInfo: MenuGroupInfo = {
          group: { title: groupName },
          groupIndex: groupIndex,
          itemsInThisGroup: items,
        }
        return (
          <Slot
            key={groupInfo.group.title}
            slotName={[
              '__MenuGroup',
              { _selected: `${groupIndex}` === currentGroupPath, last: groupIndex === amount - 1 },
            ]}
          >
            {groupName !== 'null' /* 如果是组名是 "null" 则不渲染 */ && __MenuGroup?.(groupInfo)}
            {children(items, groupInfo)}
          </Slot>
        )
      })}
    </>
  )
}
function MenuItems(props: Props__MenuItems) {
  const { currentPath, items, group, onSelectMenuItem, __MenuItem } = props
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
          <Slot
            key={itemInfo.item.itemPathLabel}
            slotName={[
              '__MenuItem',
              { _selected: `${group?.groupIndex ?? 0}/${itemIndex}` === currentPath },
            ]}
            onClick={() => onSelectMenuItem?.(itemInfo)}
          >
            {__MenuItem?.(itemInfo)}
            {itemIndex !== items.length - 1 && props.__BetweenItems?.(itemIndex, itemInfo)}
          </Slot>
        )
      })}
    </>
  )
}

export default React.memo(Menu) as typeof Menu //为了使组件不丧失generic的能力
