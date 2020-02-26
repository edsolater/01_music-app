import React, { useEffect, ReactNode } from 'react'

import './Menu.scss'
import { useMaster } from 'mypack/basic_components/customHooks'
import { ComponentRoot, Slot, componentRootProps, View, ComponentRootPorpType, List } from '.'
import { pick, UArray } from '../utils'
import { Path } from 'mypack/class/StateStringPath'
/**
 * Menu中的Item信息
 */
interface ItemData {
  title?: string
  subtitle?: string
  detail?: object // 用于自定义各种信息
}

/**
 * Menu中的组别信息
 */
interface GroupData {
  name: string
}
/**
 * 需要传递给<Menu>组件（带Group的数据形式）
 */
interface MenuInfo {
  [groupName: string]: ItemData[]
}

type ItemInfo = {
  data: ItemData
  index: number
  siblings: GroupInfo['children']
  group: GroupInfo
}
type GroupInfo = {
  data: GroupData
  index: number
  children: ItemData[]
  path: Path
}
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
  data: MenuInfo
  /**
   * 选择某个菜单项时发起的回调
   */
  onSelectMenuItem?: (itemInfo: ItemInfo, event: React.MouseEvent) => void
  /**
   * 菜单项
   */
  renderMenuItem?: (itemInfo: ItemInfo, index: number) => ReactNode
  /**
   * 菜单组的标头
   */
  renderMenuGroup?: (groupInfo: GroupInfo, index: number) => ReactNode
}
/**
 * TODO： 把不是那么一眼扫过去就明白的逻辑都提出来
 */
export default function Menu<O>(props: IProps<O>) {
  const selectedPath = useMaster({
    type: 'pathStack',
    init: [{ index: props.initGroupIndex ?? 0 }, { index: props.initItemIndex ?? 0 }],
  })
  useEffect(() => {
    //TODO： 这里怎么无效？
    selectedPath.on('getPathItem', () => {
      console.log(3)
    })
  }, [])
  return (
    // TODO: 这里的数据逻辑和DOM节点信息看起来很乱。需要一键折叠节点信息的vscode插件方便看代码
    <ComponentRoot {...pick(props, componentRootProps)} name='Menu'>
      {props.children}
      {Object.entries(props.data).map(([groupName, childItems], groupIndex) => {
        const groupInfo: GroupInfo = {
          data: { name: groupName },
          index: groupIndex,
          children: childItems,
          path: selectedPath.getAllPathItems(),
        }
        return (
          // TODO: <Group>要支持竖向的，以代替View
          <View className='Menu_groupBox' key={groupName}>
            <Slot
              slotName={[
                'Menu_Group',
                { _selected: groupName === selectedPath.getFirstPathItem()?.name },
              ]}
            >
              {props.renderMenuGroup?.(groupInfo, groupIndex)}
            </Slot>
            <List
              data={childItems}
              keyPropname='title'
              renderListItem={(menuItem, itemIndex) => {
                const itemInfo: ItemInfo = {
                  group: groupInfo,
                  index: itemIndex,
                  data: menuItem,
                  siblings: childItems,
                }
                return (
                  <Slot
                    slotName={[
                      'Menu_Item',
                      {
                        _selected: UArray.hasSameItems(selectedPath.getAllPathItems(), [
                          groupInfo.data.name,
                          itemInfo.data.title,
                        ]),
                        _first: itemInfo.siblings[0] === itemInfo.data,
                        _last: itemInfo.siblings[itemInfo.siblings.length - 1] === itemInfo.data,
                      },
                    ]}
                    onClick={event => {
                      selectedPath.setAllPathItems([groupInfo.data, itemInfo.data])
                      props.onSelectMenuItem?.(itemInfo, event)
                    }}
                  >
                    {props.renderMenuItem?.(itemInfo, itemIndex)}
                  </Slot>
                )
              }}
            />
          </View>
        )
      })}
    </ComponentRoot>
  )
}

// export default React.memo(Menu) as typeof Menu //为了使组件不丧失generic的能力
