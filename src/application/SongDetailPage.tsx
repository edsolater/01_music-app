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

const initState = {
  lyricInfo: {},
  commentInfo: {
    more: true,
    total: 0,
    hotComments: [],
    comments: []
  }
}
type State = {
  lyricInfo: MusicLyric
  commentInfo: {
    more: boolean
    total: number
    hotComments: CommentItem[]
    comments: CommentItem[]
  }
}
type Action = {
  type: 'set'
} & Partial<State>

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set':
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
      fetch('/comment/music', { id: songInfo.id })
    ]).then(reses => {
      dispatch({
        type: 'set',
        lyricInfo: reses[0]?.data,
        commentInfo: reses[1]?.data
      })
    })
  }, [songInfo.id])
  return (
    <section className={`_song-detail-page ${props.shown ? '--shown' : '--hidden'}`}>
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
    </section>
  )
}
