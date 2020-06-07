import React, { ReactNode, ComponentProps, useState } from 'react'
import './SectionList.scss'
import View from 'components/UI/View'
import Slot from 'components/UI/Slot'

/* --------------------------------- TODOLIST -------------------------------- */
// TODO 需要支持头部组件
// TODO 需要支持尾部组件
// TODO 需要支持上拉事件
// TODO 需要支持下拉事件

/* ---------------------------------- 组件约定 ---------------------------------- */

function SectionList<
  T extends S extends { data: (infer T)[] } ? T : never,
  S extends { data: any[] /* 其实是T，但这里写T会产生循环的错误  */ }
>({
  sections = [],
  initSelectedPath = '',
  senctionKey = (_, idx) => String(idx),
  itemKey = (_, idx) => String(idx),
  onSelectItem,
  renderItem,
  renderSectionHeader,
  ...restProps
}: {
  /**存放SectionList数据 */
  sections?: S[]
  /**初始选择的index */
  initSelectedPath?: string
  /**用作Key的对象的属性名 */
  senctionKey?: ((section: S, index: number) => string) | keyof S
  /**用作Key的对象的属性名 */
  itemKey?: ((item: T, index: number, parentSection: S, sectionIndex: number) => string) | keyof T
  /**当用户选择新属性时启用的回调 */
  onSelectItem?: (item: T, index: number, parentSection: S, sectionIndex: number) => any
  /**Slot：渲染每一个ListItem */
  renderItem?: (item: T, index: number, parentSection: S, sectionIndex: number) => ReactNode
  /**Slot：渲染每一个Section的头部（多用于显示分组信息） */
  renderSectionHeader?: (section: S, index: number) => ReactNode
  /**Slot：渲染列表头部 */
  renderHeader?: (sections: S[]) => ReactNode
} & ComponentProps<typeof View>) {
  /* ---------------------------------- 组件语法 ---------------------------------- */

  const [selectedPath, setSelectedPath] = useState(initSelectedPath)

  /* ---------------------------------- 组件渲染 ---------------------------------- */

  return (
    // 这里更组件应该是scrollView，而不是View
    <View {...restProps} $componentName='SectionList'>
      {sections.map((sectionInfo, sectionIndex) => (
        <View
          className='group'
          key={
            typeof senctionKey === 'function'
              ? senctionKey(sectionInfo, sectionIndex)
              : sectionInfo[String(senctionKey)] ?? String(senctionKey)
          }
        >
          <Slot className='__SectionHeader'>
            {renderSectionHeader?.(sectionInfo, sectionIndex)}
          </Slot>
          <View $componentName='list' as='ul'>
            {Array.isArray(sectionInfo.data) &&
              sectionInfo.data.map((itemInfo: T, itemIndex) => (
                <Slot
                  as='li'
                  key={
                    typeof itemKey === 'function'
                      ? itemKey(itemInfo, itemIndex, sectionInfo, sectionIndex)
                      : itemInfo[String(itemKey)] ?? String(itemKey)
                  }
                  className={[
                    '__ListItem',
                    {
                      _first: itemIndex === 0,
                      _end: itemIndex === sectionInfo.data.length - 1,
                      _odd: itemIndex % 2 === 1,
                      _even: itemIndex % 2 === 0,
                      _selected: `${sectionIndex}/${itemIndex}` === selectedPath
                    }
                  ]}
                  onClick={() => {
                    onSelectItem?.(itemInfo, itemIndex, sectionInfo, sectionIndex)
                    setSelectedPath(`${sectionIndex}/${itemIndex}`)
                  }}
                >
                  {renderItem?.(itemInfo, itemIndex, sectionInfo, sectionIndex)}
                </Slot>
              ))}
          </View>
        </View>
      ))}
    </View>
  )
}

export default React.memo(SectionList) as typeof SectionList
