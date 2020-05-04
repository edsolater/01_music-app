import React, { ReactNode, ComponentProps } from 'react'

import { View, Slot } from '../wrappers'
import { List } from '.'
import { useQueue } from '../customHooks'

//TODO：是时候将类型文件单独提出一个.d.ts了，不然复杂度太高
type ItemInfo<T> = T & {
  index: number
  siblings: T[]
  group: GroupInfo<T>
}
type GroupInfo<T> = {
  label: string
  index: number
  children: T[]
  path: [GroupInfo<T>, ItemInfo<T>]
}

export default function Menu<T extends { label: string /* TODO 去除对label这个特定值的依赖 */ }>(
  props: ComponentProps<typeof View> & {
    /**
     * **必选项**
     * MenuList会使用的具体数据（Template定义渲染的样式）
     */
    data: { [groupName: string]: T[] }

    /**
     * 选择某个菜单项时发起的回调
     */
    onSelectItem?: (itemInfo: ItemInfo<T>, event: React.MouseEvent) => void
    /**
     * 菜单项
     */
    rendeItem?: (itemInfo: ItemInfo<T>, index: number) => ReactNode
    /**
     * 菜单组的标头
     */
    renderMenuGroup?: (groupInfo: GroupInfo<T>, index: number) => ReactNode
  },
) {
  const [currentMenuPath, pathSetters] = useQueue([{ label: '' }, { label: '' }] as [
    GroupInfo<T>,
    ItemInfo<T>,
  ])
  return (
    <View {...props} $componentName='Menu'>
      {props.children}
      {Object.entries(props.data).map(([groupName, groupItems], groupIndex) => {
        const groupInfo = {
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
              noSelfSelected
              listData={groupItems}
              itemKey={(item) => item.label}
              renderItem={(menuItem, itemIndex) => {
                const itemInfo = {
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
