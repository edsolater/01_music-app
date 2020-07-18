import React from 'react'
import './style.scss'

export default function SongItem(props: { item: SongItem }) {
  const songItem = props.item
  return (
    <div className='SongItem _gc --clickable'>
      <img className='_gi avatar' src={songItem.album.picUrl}></img>
      <div className='_gi name'>{songItem.name}</div>
      <div className='_gi artist-list'>{songItem.artists.map(i => i.name).join(' ')}</div>
    </div>
  )
}
