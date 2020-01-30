import React, { ReactNode, ComponentProps } from 'react'

import './Menu.scss'
import { useMaster } from 'mypack/basic_components/customHooks'
import { ComponentRoot, Slot, propofComponentRoot, View } from '.'
import { pick } from 'mypack/utils'
/**
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
type IProps = React.ComponentProps<typeof ComponentRoot> & {
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
  data: AlbumMenuItem[] | MenuGroupData
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
function Menu(props: IProps) {
  const selectedPath = useMaster({
    type: 'stringPath',
    init: `${props.initGroupIndex}/${props.initItemIndex}`,
  })
  const hasGroup = !Array.isArray(props.data)
  return (
    <ComponentRoot {...pick(props, propofComponentRoot)} name='Menu'>
      {props.children}
      {props.__MenuHeader?.(props, selectedPath.getPath())}
      {hasGroup &&
        Object.entries(props.data) /* TODO：这里没有正确的类型推断 */
          .map(([groupName, items], groupIndex) => {
            const groupInfo: MenuGroupInfo = {
              group: { title: groupName },
              groupIndex: groupIndex,
              itemsInThisGroup: items,
            }
            return (
              // TODO: <Group>要支持竖向的，以代替View
              <View className='Menu_groupBox' key={groupInfo.group.title}>
                <Slot
                  slotName={[
                    '__MenuGroup',
                    {
                      _selected:
                        `${groupIndex}` ===
                        selectedPath.getPath() /* TODO:之所以判断逻辑略显繁琐，是selectedPath本身逻辑繁琐 */,
                    },
                  ]}
                >
                  {groupName !== 'null' /* 约定：如果是组名是 "null" 则不渲染 */ &&
                    props.__MenuGroup?.(groupInfo)}
                </Slot>
                {items.map((menuItem, itemIndex) => {
                  const itemInfo: MenuItemInfo = {
                    ...groupInfo,
                    ...{
                      currentMenuPath: selectedPath.getPath(),
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
                        {
                          _selected:
                            `${groupInfo?.groupIndex ?? 0}/${itemIndex}` === selectedPath.getPath(),
                          _last: itemIndex === items.length - 1,
                        },
                      ]}
                      onClick={() => props.onSelectMenuItem?.(itemInfo)}
                    >
                      {props.__MenuItem?.(itemInfo)}
                    </Slot>
                  )
                })}
              </View>
            )
          })}
    </ComponentRoot>
  )
}

export default React.memo(Menu) as typeof Menu //为了使组件不丧失generic的能力
