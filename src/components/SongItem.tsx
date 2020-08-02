import React from 'react'
import './style.scss'

export default function SongItem(props: { item: SongItem }) {
  const songItem = props.item
  return (
    <div className='SongItem --clickable'>
      <img className='avatar' src={songItem.album.picUrl}></img>
      <div className='name'>{songItem.name}</div>
      <div className='artist-list'>{songItem.artists.map(i => i.name).join(' ')}</div>
    </div>
  )
}
