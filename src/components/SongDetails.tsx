import React from 'react'
import { TableView, Popover, Button } from '../mypack/components'

export const SongDetails = () => (
  <div className="song-details">
    <span className="plate-tital">"song-detail"</span>
    <Button>hhhh</Button>
    <Popover Content={<div>hello</div>}>
      <Button>hhhh</Button>
    </Popover>
  </div>
)
