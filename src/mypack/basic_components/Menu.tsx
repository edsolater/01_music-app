import React, { useEffect, ReactNode, ComponentProps } from 'react'

import './Menu.scss'
import { useMaster } from 'mypack/basic_components/customHooks'
import { View, Slot, List } from '.'
import { Path } from 'mypack/class/StateStringPath'

type ItemInfo = {
  title: string
  icon?: IconfontName
  subtitle?: string
  index?: number
  hasSomethingNew?: boolean
  siblings?: GroupInfo['children']
  group?: GroupInfo
  detail?: unknown
}
type GroupInfo = {
  label: string
  index?: number
  children?: ItemInfo[]
  path?: Path
}
/**
 * TODO：这样的类型形式还是有点冗余，应该declare function 的
 * TODO2: 最终是要专门写个网页介绍各个组件的传参的，这样是不是反而没有必要？
 */
type IProps = ComponentProps<typeof View> & {
  //TODO: generic掉data中的ItemInfo的类型
  /**
   * **必选项**
   * MenuList会使用的具体数据（Template定义渲染的样式）
   */
  data: { [groupName: string]: ItemInfo[] }

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
export default function Menu(props: IProps) {
  const selectedPath = useMaster({
    type: 'pathStack',
    init: [],
  })
  useEffect(() => {
    //TODO： 这里怎么无效？
    selectedPath.on('getPathItem', () => {
      console.log(3)
    })
  }, [])
  return (
    // TODO: 这里的数据逻辑和DOM节点信息看起来很乱。需要一键折叠节点信息的vscode插件方便看代码
    <View {...props} $componentName='Menu'>
      {props.children}
      {Object.entries(props.data).map(([groupName, groupItems], groupIndex) => {
        const groupInfo: GroupInfo = {
          label: groupName,
          index: groupIndex,
          children: groupItems,
          path: selectedPath.getAllPathItems(),
        }
        return (
          // TODO: <Group>要支持竖向的，以代替View
          <View className='__Groupbox' key={groupName}>
            <Slot
              slotName={[
                '__MenuGroupTitle',
                { selected: groupName === selectedPath.getFirstPathItem()?.name },
              ]}
            >
              {props.renderMenuGroup?.(groupInfo, groupIndex)}
            </Slot>
            <List
              data={groupItems}
              keyForListItems='title'
              renderListItem={(menuItem, itemIndex) => {
                const itemInfo: ItemInfo = {
                  ...menuItem,
                  group: groupInfo,
                  index: itemIndex,
                  siblings: groupItems,
                }
                return (
                  <Slot
                    slotName={[
                      '__Item',
                      '__MenuItem',
                      {
                        selected:
                          (selectedPath.getFirstPathItem() as GroupInfo)?.label ===
                            groupInfo.label &&
                          (selectedPath.getLastPathItem() as ItemInfo)?.title === itemInfo.title,
                      },
                    ]}
                    onClick={event => {
                      selectedPath.setAllPathItems([groupInfo, itemInfo])
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
    </View>
  )
}

// export default React.memo(Menu) as typeof Menu //为了使组件不丧失generic的能力
