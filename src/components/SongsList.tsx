import React from 'react'
import { TableView, Popover, Button } from '../mypack/components'
import { Song } from 'AppEntry'

export const SongsList = ({ songs: data }: { songs: Song[] }) => (
  <div className="song-details">
    <span className="plate-tital">"song-detail"</span>
    <TableView data={data} Template={(data) => {
      return (
        <div className="songItem">
          {data.songTitle}
        </div>
      )
    }}></TableView>
  </div>
)
