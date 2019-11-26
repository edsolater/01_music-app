import React from 'react'
import { TableView, Image, Label } from '../mypack/components'
import { AppDatas } from 'AppEntry'
import './SongCollections.less'

export function SongCollections({ data }: { data: AppDatas }) {
  return (
    <div className="song-collections">
      <span className="plate-title">song-collection</span>
      <TableView
        data={data}
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
