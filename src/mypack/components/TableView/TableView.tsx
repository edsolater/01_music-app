import React, { ReactNode } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'

import './TableView.less'
import { useUIState } from '../__customHooks'
type UIState = {
  selectedItemIndex: number
}
type Data = {
  id?: string | number
  key?: string | number
  title?: string
  imageUrl?: string
  subtitle?: string
  detail?: string
  [any: string]: any
}
function TableView<D extends Data>({
  //为了使解析器识别generic的语法，不得不用function声明
  className,
  initIndex,
  data,
  Template,
  on,
  uiState,
  ...restProps
}: {
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  /**
   * 初始化选择的index
   */
  initIndex?: number
  /**
   * TableView会使用的具体数据（Template定义渲染的样式）
   */
  data: D[]
  /**
   * TableView对每条数据的渲染界面（函数传入data中的数据）
   */
  Template: (dataItem: D, index: number, array: typeof dataItem[]) => ReactNode
  on?: {
    clickItem?: (dataItem: D, index: number, array: typeof dataItem[]) => any
  }
  uiState?: UIState
} & JSX.IntrinsicElements['div']) {
  const selectedItemIndex = useUIState({ type: 'index-recorder', init: initIndex })
  //#region 上抛 UIState
  if (uiState) {
    Object.assign(uiState, {
      selectedItemIndex: selectedItemIndex.value,
    } as UIState)
  }
  //#endregion
  return (
    <div className={classnames(className, 'TableView')} {...restProps}>
      {data.map((data, index, array) => (
        <div
          className={classnames('Item', { selected: index === selectedItemIndex.value })}
          key={data.key ?? data.id ?? index}
          onClick={() => {
            selectedItemIndex.set(index)
            on?.clickItem?.(data, index, array)
          }}
        >
          {Template(data, index, array)}
        </div>
      ))}
    </div>
  )
}

export default React.memo(TableView) as typeof TableView //为了使组件不丧失generic的能力
