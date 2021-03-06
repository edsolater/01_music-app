import React, { useContext } from 'react'
import './style.scss'

import { State as PlayerState, Action as PlayerAction } from './PlayerBar'

import { AllResponse } from 'typings/requestPath'
import CommentItem from 'components/CommentItem'
import { SongInfoContext } from 'context/SongInfo'
import PlaylistItem from 'components/PlaylistItem'
import SongItem from 'components/SongItem'
import { useResource } from 'hooks/useFetch'
import MyCover from 'components/MyCover'

export default function SongDetailPage(props: {
  palyerState: PlayerState
  playerDispatch: React.Dispatch<PlayerAction>
  /**是否显示/隐藏 */
  shown?: boolean
}) {
  const { songInfo } = useContext(SongInfoContext)
  // TODO： 总觉得可以再简化
  const lyricInfo = useResource<AllResponse['/lyric']>('/lyric', {
    id: songInfo?.id
  }).res
  const commentInfo = useResource<AllResponse['/comment/music']>('/comment/music', {
    id: songInfo?.id
  }).res
  const simiPlaylists = useResource<AllResponse['/simi/playlist']>('/simi/playlist', {
    id: songInfo?.id
  }).res?.playlists
  const simiSong = useResource<AllResponse['/simi/song']>('/simi/song', {
    id: songInfo?.id
  }).res?.songs

  return (
    <section className={`SongDetailPage ${props.shown ? '--shown' : '--hidden--scale-mode'}`}>
      {/* 转啊转的专辑封面 */}
      <div
        className={`current-song-cover ${props.palyerState.isplaying ? '--playing' : '--paused'}`}
      >
        <MyCover src={songInfo?.al?.picUrl}></MyCover>
      </div>

      {/* 歌词 */}
      <div className='lyric-box'>{lyricInfo?.lrc?.lyric ?? '暂无歌词'}</div>

      {/* 评论词条 */}
      <div className='comments'>
        {commentInfo?.comments?.map(item => (
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
      <div className='playlists'>
        <div className='info-header'>包含这首歌的歌单</div>
        <div className='list'>
          {simiPlaylists?.map(item => (
            <PlaylistItem
              key={item.id}
              item={item}
              onClick={() => props.playerDispatch({ type: 'show/hide <SongDetailPage>' })}
            />
          ))}
        </div>
      </div>

      {/* 相似歌曲 */}
      <div className='simi-songs'>
        <div className='info-header'>相似歌曲</div>
        <div className='list'>
          {simiSong?.map(item => (
            <SongItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
