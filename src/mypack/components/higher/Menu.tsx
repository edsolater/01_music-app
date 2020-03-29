import React, { ReactNode, ComponentProps } from 'react'

import { Path } from 'mypack/class/StateStringPath'
import { IconfontName } from 'iconfont/namelist'
import { View, Slot } from '../wrappers'
import { List } from '.'
import { useQueue } from '../customHooks'

type ItemInfo = {
  label: string
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
 * TODO： 把不是那么一眼扫过去就明白的逻辑都提出来
 */
export default function Menu<T extends ItemInfo>(
  props: ComponentProps<typeof View> & {
    //TODO: generic掉data中的ItemInfo的类型
    /**
     * **必选项**
     * MenuList会使用的具体数据（Template定义渲染的样式）
     */
    data: { [groupName: string]: T[] }

    /**
     * 选择某个菜单项时发起的回调
     */
    onSelectItem?: (itemInfo: T, event: React.MouseEvent) => void
    /**
     * 菜单项
     */
    rendeItem?: (itemInfo: T, index: number) => ReactNode
    /**
     * 菜单组的标头
     */
    renderMenuGroup?: (groupInfo: GroupInfo, index: number) => ReactNode
  },
) {
  //TODO：定义空数组时也能定义元素的类型信息，即currentMenuPath要自带类型信息
  const [currentMenuPath, pathSetters] = useQueue([{ label: '' }, { label: '' }] as [GroupInfo, T])
  return (
    // TODO: 这里的数据逻辑和DOM节点信息看起来很乱。需要一键折叠节点信息的vscode插件方便看代码
    <View {...props} $componentName='Menu'>
      {props.children}
      {Object.entries(props.data).map(([groupName, groupItems], groupIndex) => {
        const groupInfo: GroupInfo = {
          label: groupName,
          index: groupIndex,
          children: groupItems,
          path: currentMenuPath,
        }
        return (
          <View className='Groupbox' key={groupName}>
            <Slot
              className={['MenuGroupTitle', { _selected: groupName === currentMenuPath[0].label }]}
            >
              {props.renderMenuGroup?.(groupInfo, groupIndex)}
            </Slot>
            <List
              $noSelfSelected
              data={groupItems}
              itemKey={(item) => item.label}
              renderItem={(menuItem, itemIndex) => {
                const itemInfo: T = {
                  ...menuItem,
                  group: groupInfo,
                  index: itemIndex,
                  siblings: groupItems,
                }
                return (
                  <Slot
                    className={[
                      {
                        _selected:
                          currentMenuPath[0].label === groupInfo.label &&
                          currentMenuPath[1].label === itemInfo.label,
                      },
                    ]}
                    onClick={(event) => {
                      pathSetters.set([groupInfo, itemInfo])
                      props.onSelectItem?.(itemInfo, event)
                    }}
                  >
                    {props.rendeItem?.(itemInfo, itemIndex)}
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
