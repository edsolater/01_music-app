import React, { useContext } from 'react'
import './style.scss'
import Icon from 'baseUI/UI/Icon'
import { headset } from 'assets/icons'
import { RouterContext } from 'context/router'

export default function PlaylistItem(props: {
  item: PlaylistItem | RecommendResource
  type?: 'portrait'
}) {
  const [, routeDispatch] = useContext(RouterContext)
  switch (props.type) {
    case 'portrait': {
      const playlistItem = props.item as RecommendResource
      return (
        <div
          className='PlaylistItem_portrait --clickable'
          onClick={() =>
            routeDispatch({ type: 'to', item: { name: 'playlist', id: playlistItem.id } })
          }
        >
          <div className='picture'>
            <div className='legend'>
              <span>{playlistItem.copywriter}</span>
            </div>
            <div className='count'>
              <Icon src={headset} />
              <span className='number'>{playlistItem.playcount}</span>
            </div>
            <img src={playlistItem.picUrl} className='thumbnail' />
          </div>
          <span className='description'>{playlistItem.name}</span>
        </div>
      )
    }
    default: {
      const playlistItem = props.item as PlaylistItem
      return (
        <div
          className='PlaylistItem --clickable'
          onClick={() =>
            routeDispatch({ type: 'to', item: { name: 'playlist', id: playlistItem.id } })
          }
        >
          <img className='avatar' src={playlistItem.picUrl ?? playlistItem.coverImgUrl}></img>
          <div className='name'>{playlistItem.name}</div>
          <div className='play-count'>播放: {playlistItem.playcount ?? playlistItem.playCount}</div>
        </div>
      )
    }
  }
}
