import React, { ReactNode, ComponentProps } from 'react'

import { Path } from 'mypack/class/StateStringPath'
import { IconfontName } from 'iconfont/namelist'
import { View, Slot } from '../wrappers'
import { List } from '.'
import { useQueue } from '../customHooks'

type ItemInfo = {
  //TODO: 这个label也要去掉，这样使用<Menu>组件才全无后顾之忧。最好能只传来一个id
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
  const [currentMenuPath, pathSetters] = useQueue([{ label: '' }, { label: '' }] as [GroupInfo, T])
  return (
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
