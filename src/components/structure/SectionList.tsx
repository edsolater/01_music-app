import React, { ReactNode, ComponentProps, useState } from 'react'
import './SectionList.scss'
import { View, Slot } from '../wrappers'

/* --------------------------------- TODOLIST -------------------------------- */
// FIXME - 待完善
// TODO 需要支持头部组件
// TODO 需要支持尾部组件
// TODO 需要支持上拉事件
// TODO 需要支持下拉事件

/* ---------------------------------- 组件约定 ---------------------------------- */

function SectionList<T extends S extends { data: (infer T)[] } ? T : never, S>({
  sections = [],
  initSelectedIndex = NaN,
  senctionKey = (_, idx) => String(idx),
  itemKey = (_, idx) => String(idx),
  onSelectItem,
  renderItem,
  ...restProps
}: {
  /**存放SectionList数据 */
  sections?: S[]
  /**初始选择的index */
  initSelectedIndex?: number
  /**用作Key的对象的属性名 */
  senctionKey?: ((item: S, index: number, items: S[]) => string) | keyof S
  /**用作Key的对象的属性名 */
  itemKey?: ((item: T, index: number, items: S[]) => string) | keyof S
  /**当用户选择新属性时启用的回调 */
  onSelectItem?: (item: S, index: number, items: S[]) => any
  /**Slot：渲染每一个ListItem */
  renderItem?: (item: S, index: number, items: S[]) => ReactNode
} & ComponentProps<typeof View>) {
  /* ---------------------------------- 组件语法 ---------------------------------- */

  const [selectedIndex, setSelectedIndex] = useState(initSelectedIndex)
  return (
    <View {...restProps} $componentName='SectionList' as='ul'>
      {sections?.map((sectionInfo, index) => (
        <Slot
          as='li'
          key={
            typeof senctionKey === 'function'
              ? senctionKey(sectionInfo, index, sections!)
              : sectionInfo[String(senctionKey)]
          }
          className={{
            _first: index === 0,
            _end: index === sections.length - 1,
            _odd: index % 2 === 1,
            _even: index % 2 === 0,
            _selected: index === selectedIndex,
          }}
          onClick={() => {
            onSelectItem?.(sectionInfo, index, sections!)
            setSelectedIndex(index)
          }}
        >
          {renderItem?.(sectionInfo, index, sections!)}
        </Slot>
      ))}
    </View>
  )
}

export default React.memo(SectionList) as typeof SectionList
