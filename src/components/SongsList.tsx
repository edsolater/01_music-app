import React from 'react'
import { TableView, Popover, Button } from '../mypack/components'
import { Song } from 'AppEntry'

export const SongsList = ({ songs: data }: { songs: Song[] }) => (
  <div className="song-details">
    <span className="plate-tital">"song-detail"</span>
    {data.map(({ songTitle, soundtrackUrl, albumUrl }) => (
      <div className="songTitle" key={songTitle}>
        {songTitle}
      </div>
    ))}
  </div>
)
