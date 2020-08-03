import React, { Fragment, useContext } from 'react'
import './style.scss'
import Icon from 'baseUI/UI/Icon'
import { SongInfoContext } from 'context/SongInfo'

export default function SongItem(props: { item: SongItem; type?: 'in-home' }) {
  const [, , setSongId] = useContext(SongInfoContext)
  const songItem = props.item
  switch (props.type) {
    case 'in-home': {
      return (
        <div className='SongItem_in-home'>
          <img className='cover' src={songItem.album.picUrl} />
          <span className='name'>{songItem.name}</span>
          <div className='badges'>
            <Icon iconfontName='sq' />
            <Icon iconfontName='mv' />
          </div>
          <div className='artist-list'>
            {songItem.artists.map((artist, index, { length }) => (
              <Fragment key={artist.name}>
                <span className='artist --clickable-without-backdrop-effect'>{artist.name}</span>
                {index !== length - 1 && <span className='slash'>/</span>}
              </Fragment>
            ))}
          </div>
        </div>
      )
    }
    default: {
      console.log(songItem)
      return (
        <div
          className='SongItem --clickable'
          onClick={() => {
            setSongId(songItem.id)
          }}
        >
          <img className='cover' src={songItem.album.picUrl}></img>
          <div className='name'>{songItem.name}</div>
          <div className='artist-list'>{songItem.artists.map(i => i.name).join(' ')}</div>
        </div>
      )
    }
  }
}
