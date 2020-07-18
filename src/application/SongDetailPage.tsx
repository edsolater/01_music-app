import React, { ComponentProps, useReducer, useEffect, useContext, Fragment } from 'react'

import { State as PlayerState, Action as PlayerAction } from './PlayerBar'
import './SongDetailPage.scss'

import fetch from 'api/fetch'
import { RouterContext } from 'context/router'
import { recoder } from 'assets/icons'
import View from 'baseUI/UI/View'
import Image from 'baseUI/UI/Image'
import Text from 'baseUI/UI/Text'
import Icon from 'baseUI/UI/Icon'
import { overwrite } from 'functions/object'
import CommentItem from 'components/CommentItem'
import { SongInfoContext } from 'context/SongInfo'
import PlaylistItem from 'components/PlaylistItem'

const initState = {
  lyricInfo: {},
  commentInfo: {
    more: true,
    total: 0,
    hotComments: [],
    comments: []
  },
  simiPlaylist: []
}
type State = {
  lyricInfo: MusicLyric
  commentInfo: {
    more: boolean
    total: number
    hotComments: CommentItem[]
    comments: CommentItem[]
  }
  simiPlaylist: PlaylistItem[]
}
type Action = {
  type: 'set by data'
} & Partial<State>

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set by data':
      return overwrite({ ...state }, action)
    default:
      return state
  }
}

export default function SongDetailPage(props: {
  palyerState: PlayerState
  playerDispatch: React.Dispatch<PlayerAction>
  /**是否显示/隐藏 */
  shown?: boolean
}) {
  const [state, dispatch] = useReducer(reducer, initState)
  const [songInfo] = useContext(SongInfoContext)
  useEffect(() => {
    Promise.all([
      fetch('/lyric', { id: songInfo.id }),
      fetch('/comment/music', { id: songInfo.id }),
      fetch('/simi/playlist', { id: songInfo.id })
    ]).then(reses => {
      dispatch({
        type: 'set by data',
        lyricInfo: reses[0]?.data,
        commentInfo: reses[1]?.data,
        simiPlaylist: reses[2]?.data.playlists
      })
    })
  }, [songInfo.id])
  return (
    <section className={`SongDetailPage ${props.shown ? '--shown' : '--hidden'}`}>
      <Text>songId: {songInfo.id}</Text>

      {/* 转啊转的专辑封面 */}
      <div className={`cover ${props.palyerState.isplaying ? '--rotating' : '--stopped'}`}>
        <img src={songInfo.al?.picUrl}></img>
      </div>

      {/* 歌词 */}
      <div className='_lyric'>{state.lyricInfo.lrc?.lyric ?? '暂无歌词'}</div>

      {/* 评论词条 */}
      <div className='_comments'>
        {state.commentInfo.comments.map(item => (
          <CommentItem
            key={item.commentId}
            avatarUrl={item.user.avatarUrl}
            nickname={item.user.nickname}
            content={item.content}
            time={item.time}
          />
        ))}
      </div>

      {/* 包含这首歌的歌单 */}
      <div className='_playlists'>
        {state.simiPlaylist.map(item => (
          <PlaylistItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
