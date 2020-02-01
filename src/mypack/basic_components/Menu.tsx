import React, { ReactNode } from 'react'

import './Menu.scss'
import { useMaster } from 'mypack/basic_components/customHooks'
import {
  ComponentRoot,
  Slot,
  componentRootProps,
  View,
  $$FlowControl$$,
  ComponentRootPorpType,
} from '.'
import { pick } from '../utils'
/**
 * Menu中的Item信息
 */
interface MenuItemData {
  [itemInfo: string]: string | undefined
  imageUrl?: string
  itemPathLabel: string
  subtitle?: string
  detail?: string
  selectAction?: ActionType
}

/**
 * TODO: 太过语义化了，要删掉
 * Menu中的组别信息
 */
interface AlbumMenuGroup {
  title: string
  [otherInfo: string]: string | undefined
}
/**
 * 需要传递给<Menu>组件（带Group的数据形式）
 */
interface MenuGroupData {
  [groupPathLabel: string]: MenuItemData[]
}
/**
 * TODO：这个Menu组件的内聚性打散了，太过复杂，必须重写
 */
type MenuItemInfo = MenuGroupInfo & {
  item: MenuItemData
  itemIndex: number
}
type MenuGroupInfo = {
  group: AlbumMenuGroup
  groupIndex: number
  itemsInGroup: MenuItemData[]
  currentMenuPath: PathPiece //TODO: 这里是不是应该是个完整的对象 //TODO: 这里的值不应该由没有意义的数字组成
}
type PathPiece = string //Temp
/**
 * TODO：这样的类型形式还是有点冗余，应该declare function 的
 * TODO2: 最终是要专门写个网页介绍各个组件的传参的，这样是不是反而没有必要？
 */
type IProps<O> = ComponentRootPorpType<O> & {
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
  data: MenuGroupData
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
   * 选择某个菜单项时发起的回调
   */
  onSelectMenuItem?: (itemInfo: MenuItemInfo, event: React.MouseEvent) => void
}
function Menu<O>(props: IProps<O>) {
  const selectedPath = useMaster({
    type: 'stringPath',
    init: `${props.initGroupIndex ?? 0}/${props.initItemIndex ?? 0}`,
  })
  return (
    <ComponentRoot {...pick(props, componentRootProps)} name='Menu'>
      {props.children}
      <$$FlowControl$$
        $for={Object.entries(props.data as MenuGroupData)}
        $formatter={([groupName, items], groupIndex) => ({
          group: { title: groupName },
          groupIndex: groupIndex,
          itemsInGroup: items,
          currentMenuPath: selectedPath.getPath(),
        })}
        $formatterReturnType={{} as MenuGroupInfo}
      >
        {(groupInfo) => (
          // TODO: <Group>要支持竖向的，以代替View
          <View className='Menu_groupBox' key={groupInfo.group.title}>
            <Slot
              slotName={[
                '__MenuGroupTitle',
                {
                  _selected:
                    `${groupInfo.groupIndex}` ===
                    selectedPath.getPath() /* TODO:之所以判断逻辑略显繁琐，是selectedPath本身逻辑繁琐 */,
                },
              ]}
            >
              {groupInfo.group.title !== 'null' /* 约定：如果是组名是 "null" 则不渲染 */ &&
                props.__MenuGroup?.(groupInfo)}
            </Slot>
            <$$FlowControl$$
              $for={groupInfo.itemsInGroup}
              $formatter={(menuItem, itemIndex) => ({
                ...groupInfo,
                ...{
                  itemIndex,
                  item: menuItem,
                },
              })}
              $formatterReturnType={{} as MenuItemInfo}
            >
              {(itemInfo) => (
                <Slot
                  key={itemInfo.item.itemPathLabel}
                  slotName={[
                    '__MenuItem',
                    {
                      _selected:
                        `${groupInfo?.groupIndex ?? 0}/${itemInfo.itemIndex}` ===
                        selectedPath.getPath(),
                      _first: itemInfo.itemIndex === 0,
                      _last: itemInfo.itemIndex === itemInfo.itemsInGroup.length - 1,
                    },
                  ]}
                  onClick={(event) => {
                    selectedPath.set(`${groupInfo.groupIndex}/${itemInfo.itemIndex}`)
                    props.onSelectMenuItem?.(itemInfo, event)
                  }}
                >
                  {props.__MenuItem?.(itemInfo)}
                </Slot>
              )}
            </$$FlowControl$$>
          </View>
        )}
      </$$FlowControl$$>
    </ComponentRoot>
  )
}

export default React.memo(Menu) as typeof Menu //为了使组件不丧失generic的能力
