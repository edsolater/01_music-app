import React from 'react'
import { TableView, Popover, Button } from '../mypack/components'

export const SongDetails = () => (
  <div className="song-details">
    <span className="plate-tital">"song-detail"</span>
    <Button>hhhh</Button>
    <Popover isOpen={true} Content={<div>hello</div>}>
      <Button>hhhh</Button>
    </Popover>
  </div>
)
