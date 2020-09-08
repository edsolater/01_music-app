import React, { Fragment, useContext, MouseEventHandler } from 'react'
import './style.scss'
import Icon from 'baseUI/UI/Icon'
import { SongInfoContext } from 'context/SongInfo'
import MyCover from './MyCover'

export default function SongItem(props: {
  item: SongItem
  type?: 'in-home'
  onClick?: MouseEventHandler<HTMLDivElement>
}) {
  const { setSongId } = useContext(SongInfoContext)
  const songItem = props.item
  switch (props.type) {
    case 'in-home': {
      return (
        <div className='SongItem_in-home'>
          <MyCover className='cover' src={songItem.album.picUrl} />
          <span className='name'>{songItem.name}</span>
          <div className='badges'>
            <Icon iconfontName='sq' />
            <Icon iconfontName='mv' />
          </div>
          <div className='artist-list'>
            {songItem.artists.map((artist, index, { length }) => (
              <Fragment key={artist.name}>
                <span className='artist _clickable-without-backdrop-effect'>{artist.name}</span>
                {index !== length - 1 && <span className='slash'>/</span>}
              </Fragment>
            ))}
          </div>
        </div>
      )
    }
    default: {
      return (
        <div
          className='SongItem _clickable'
          onClick={ev => {
            props.onClick?.(ev)
            setSongId(songItem.id)
          }}
        >
          <MyCover className='cover' src={songItem.album.picUrl} />
          <div className='name'>{songItem.name}</div>
          <div className='artist-list'>{songItem.artists.map(i => i.name).join(' ')}</div>
        </div>
      )
    }
  }
}
