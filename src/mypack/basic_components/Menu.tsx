import React, { ReactNode, useEffect } from 'react'

import './Menu.scss'
import { useMaster } from 'mypack/basic_components/customHooks'
import { ComponentRoot, Slot, componentRootProps, View, $For, ComponentRootPorpType } from '.'
import { pick, isLast, isFirst, hasSameProperty } from '../utils'
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
 * TODO: 太过语义化了，要删掉
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
/**
 * TODO：这个Menu组件的内聚性打散了，太过复杂，必须重写
 */
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
   * **必选项**
   * Menu对具体数据的渲染（函数传入data中的数据）
   */
  __MenuItem: (itemInfo: ItemInfo) => ReactNode
  /**
   * Menu对编组的渲染
   */
  __MenuGroup?: (groupInfo: GroupInfo) => ReactNode
  /**
   * 选择某个菜单项时发起的回调
   */
  onSelectMenuItem?: (itemInfo: ItemInfo, event: React.MouseEvent) => void
}
/**
 * TODO： 把不是那么一眼扫过去就明白的逻辑都提出来
 */
function Menu<O>(props: IProps<O>) {
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
    <ComponentRoot {...pick(props, componentRootProps)} name='Menu'>
      {props.children}
      <$For
        $for={Object.entries(props.data as MenuInfo)}
        $formatter={([groupName, items], groupIndex) =>
          ({
            data: { name: groupName } as GroupData,
            index: groupIndex,
            children: items,
            path: selectedPath.getAllPathItems(),
          } as GroupInfo)
        }
        $formatterReturnType={{} as GroupInfo}
      >
        {(groupInfo) => (
          // TODO: <Group>要支持竖向的，以代替View
          <View className='Menu_groupBox' key={groupInfo.data.name}>
            <Slot
              slotName={[
                '__MenuGroupTitle',
                {
                  _selected: hasSameProperty(
                    groupInfo.data,
                    selectedPath.getFirstPathItem(),
                    'name',
                  ),
                },
              ]}
            >
              {groupInfo.data.name !== 'null' /* 约定：如果是组名是 "null" 则不渲染 */ &&
                props.__MenuGroup?.(groupInfo)}
            </Slot>
            <$For
              $for={groupInfo.children}
              $formatter={(menuItem, itemIndex) =>
                ({
                  group: groupInfo,
                  index: itemIndex,
                  data: menuItem,
                  siblings: groupInfo.children,
                } as ItemInfo)
              }
              $formatterReturnType={{} as ItemInfo}
            >
              {(itemInfo) => (
                <Slot
                  key={itemInfo.data.title}
                  slotName={[
                    '__MenuItem',
                    {
                      _selected:
                        hasSameProperty(groupInfo.data, selectedPath.getFirstPathItem(), 'name') &&
                        hasSameProperty(itemInfo.data, selectedPath.getLastPathItem(), 'title'),
                      _first: isFirst(itemInfo.siblings, itemInfo.data),
                      _last: isLast(itemInfo.siblings, itemInfo.data),
                    },
                  ]}
                  onClick={(event) => {
                    selectedPath.setAllPathItems([groupInfo.data, itemInfo.data])
                    props.onSelectMenuItem?.(itemInfo, event)
                  }}
                >
                  {props.__MenuItem?.(itemInfo)}
                </Slot>
              )}
            </$For>
          </View>
        )}
      </$For>
    </ComponentRoot>
  )
}

export default React.memo(Menu) as typeof Menu //为了使组件不丧失generic的能力
