import React, { useReducer, useEffect, useContext } from 'react'
import './style.scss'

import { State as PlayerState, Action as PlayerAction } from './PlayerBar'

import fetch from 'api/fetch'
import { overwrite } from 'utils/object'
import CommentItem from 'components/CommentItem'
import { SongInfoContext } from 'app/context/SongInfo'
import PlaylistItem from 'components/PlaylistItem'
import SongItem from 'components/SongItem'

const initState = {
  lyricInfo: {},
  commentInfo: {
    more: true,
    total: 0,
    hotComments: [],
    comments: []
  },
  simiPlaylists: [],
  simiSongs: []
}
type State = {
  lyricInfo: MusicLyric
  commentInfo: {
    more: boolean
    total: number
    hotComments: CommentItem[]
    comments: CommentItem[]
  }
  simiPlaylists: PlaylistItem[]
  simiSongs: SongItem[]
}
type Action = {
  type: 'set from data'
} & Partial<State>

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set from data':
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
      fetch('/simi/playlist', { id: songInfo.id }),
      fetch('/simi/song', { id: songInfo.id })
    ]).then(reses => {
      dispatch({
        type: 'set from data',
        lyricInfo: reses[0]?.data,
        commentInfo: reses[1]?.data,
        simiPlaylists: reses[2]?.data.playlists,
        simiSongs: reses[3]?.data.songs
      })
    })
  }, [songInfo.id])
  return (
    <section className={`SongDetailPage ${props.shown ? '--shown' : '--hidden'}`}>
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
        {state.simiPlaylists.map(item => (
          <PlaylistItem key={item.id} item={item} />
        ))}
      </div>

      {/* 相似歌曲 */}
      <div className='_simi'>
        {state.simiSongs.map(item => (
          <SongItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
