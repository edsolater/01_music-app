import React, { ReactNode } from 'react'
import * as classnames from 'classnames'
import { ClassValue } from 'classnames/types'

import './TableView.less'

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
  data,
  Template,
  ...restProps
}: {
  /**
   * 接收classnames()能接收的各种参数
   */
  className?: ClassValue
  data: D[]
  Template: (dataItem: D, index: number, array: typeof dataItem[]) => ReactNode
} & JSX.IntrinsicElements['div']) {
  return (
    <div className={classnames(className, 'TableView')} {...restProps}>
      {data.map((data, index, array) => (
        <div className="Item" key={data.key ?? data.id ?? index}>
          {Template(data, index, array)}
        </div>
      ))}
    </div>
  )
}

export default React.memo(TableView) as typeof TableView //为了使组件不丧失generic的能力
