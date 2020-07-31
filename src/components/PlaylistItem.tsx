import React from 'react'
import './style.scss'

export default function PlaylistItem(props: { item: PlaylistItem }) {
  const playlistItem = props.item
  return (
    <div className='PlaylistItem grid-box --clickable'>
      <img className='_gi avatar' src={playlistItem.picUrl ?? playlistItem.coverImgUrl}></img>
      <div className='_gi name'>{playlistItem.name}</div>
      <div className='_gi play-count'>播放: {playlistItem.playcount ?? playlistItem.playCount}</div>
    </div>
  )
}
