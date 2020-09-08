import React, { useContext, MouseEventHandler } from 'react'
import './style.scss'
import Icon from 'baseUI/UI/Icon'
import { headset } from 'assets/icons'
import { RouterContext } from 'context/router'
import MyCover from './MyCover'

export default function PlaylistItem(props: {
  item?: PlaylistItem | RecommendResource
  type?: 'portrait' | 'daily-recommend'
  /**只有当 'daily-recommend' 时才可用 */
  dailyInfo?: {
    day: string
    date: string
  }
  onClick?: MouseEventHandler<HTMLDivElement>
}) {
  const [, routeDispatch] = useContext(RouterContext)
  switch (props.type) {
    case 'portrait': {
      const playlistItem = props.item as RecommendResource
      return (
        <div
          className='PlaylistItem_portrait _clickable'
          onClick={ev => {
            props.onClick?.(ev)
            routeDispatch({ type: 'to', item: { name: 'playlist', id: playlistItem.id } })
          }}
        >
          <div className='picture'>
            <div className='legend'>
              <span>{playlistItem.copywriter}</span>
            </div>
            <div className='count'>
              <Icon src={headset} />
              <span className='number'>{playlistItem.playcount}</span>
            </div>
            <MyCover src={playlistItem.picUrl} className='thumbnail' />
          </div>
          <span className='description'>{playlistItem.name}</span>
        </div>
      )
    }
    case 'daily-recommend': {
      return (
        <div
          className='PlaylistItem_daily-recommend _clickable'
          onClick={ev => {
            props.onClick?.(ev)
            routeDispatch({ type: 'to', item: { name: 'playlist', id: 'daily-recommend' } })
          }}
        >
          <div className='picture'>
            <div className='thumbnail-recommend' />
            <span className='day'>{props.dailyInfo?.day}</span>
            <span className='date'>{props.dailyInfo?.date}</span>
          </div>
          <span className='legend'>每日歌曲推荐</span>
        </div>
      )
    }
    default: {
      const playlistItem = props.item as PlaylistItem
      return (
        <div
          className='PlaylistItem _clickable'
          onClick={ev => {
            props.onClick?.(ev)
            routeDispatch({ type: 'to', item: { name: 'playlist', id: playlistItem.id } })
          }}
        >
          <MyCover className='avatar' src={playlistItem.picUrl ?? playlistItem.coverImgUrl} />
          <div className='name'>{playlistItem.name}</div>
          <div className='play-count'>播放: {playlistItem.playcount ?? playlistItem.playCount}</div>
        </div>
      )
    }
  }
}
