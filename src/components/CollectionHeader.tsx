import React, { ComponentProps } from 'react'
import { TableView, Image, Label } from '../mypack/components'
import { Header } from 'AppEntry'
import './CollectionHeader.less'

export function CollectionHeader({
  data,
  initIndex,
  changeIndex,
}: {
  data: Header[]
  initIndex?: number
  changeIndex?: Exclude<ComponentProps<typeof TableView>['on'], undefined>['clickItem']
}) {
  return (
    <div className="song-collections">
      <span className="plate-title">song-collection</span>
      <TableView
        data={data}
        initIndex={initIndex}
        on={{
          clickItem: changeIndex,
        }}
        Template={(data) => (
          <div
            onClick={() => {
              console.log(`click ${data.title}`)
            }}
          >
            <Image src={data.imageUrl} />
            <Label className="title">{data.title}</Label>
          </div>
        )}
      />
    </div>
  )
}
