import React from 'react'
import { TableView, Popover, Button } from '../mypack/components'
import { Songs } from 'AppEntry'

export const SongsList = ({ data }: { data: Songs }) => (
  <div className="song-details">
    <span className="plate-tital">"song-detail"</span>
    {data.map(({ songTitle, soundtrackUrl, albumUrl }) => (
      <div className="songTitle">{songTitle}</div>
    ))}
  </div>
)
