import React from 'react'
import { TableView, Image } from '../mypack/components'
import { AppDatas } from 'AppEntry'

export function SongCollections({ data }: { data: AppDatas }) {
  return (
    <div className="song-collections">
      <span className="plate-tital">song-collection</span>
      <TableView
        data={data}
        Template={(data) => (
          <div className="collection-item">
            <Image src={data.imageUrl} />
            <span className="title">{data.title}</span>
          </div>
        )}
      />
    </div>
  )
}
