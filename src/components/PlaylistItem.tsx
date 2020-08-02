import React from 'react'
import './style.scss'

export default function PlaylistItem(props: { item: PlaylistItem }) {
  const playlistItem = props.item
  return (
    <div className='PlaylistItem --clickable'>
      <img className='avatar' src={playlistItem.picUrl ?? playlistItem.coverImgUrl}></img>
      <div className='name'>{playlistItem.name}</div>
      <div className='play-count'>播放: {playlistItem.playcount ?? playlistItem.playCount}</div>
    </div>
  )
}
