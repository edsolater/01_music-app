import React, { ComponentProps } from 'react'
import './style.scss'

import { AllResponse } from 'typings/requestPath'
import View from 'baseUI/UI/View'
import CommentItem from 'components/CommentItem'
import { useResource } from 'hooks/useFetch'
import MvItem from 'components/MvItem'

export default function MvDetailPage(
  props: ComponentProps<typeof View> & {
    id: ID
  }
) {
  const mvUrl = useResource<AllResponse['/mv/url']>('/mv/url', {
    id: props.id
  }).res?.data.url
  const simiMvs = useResource<AllResponse['/simi/mv']>('/simi/mv', {
    mvid: props.id
  }).res?.mvs
  const commentInfo = useResource<AllResponse['/comment/mv']>('/comment/mv', {
    id: props.id
  }).res
  // const mvStatisticData = useResource<AllResponse['/mv/detail/info']>('/mv/detail/info', {
  //   mvid: props.id
  // }).data
  const mvDetail = useResource<AllResponse['/mv/detail']>('/mv/detail', {
    mvid: props.id
  }).res?.data

  return (
    <section className='MvDetailPage'>
      <div className='col-1'>
        <video className='mv-window' src={mvUrl} controls />
        {/* 评论词条 */}
        <div className='comments'>
          {commentInfo?.comments.map(item => (
            <CommentItem
              key={item.commentId}
              avatarUrl={item.user.avatarUrl}
              nickname={item.user.nickname}
              content={item.content}
              time={item.time}
            />
          ))}
        </div>
      </div>

      <div className='col-2'>
        {/* mv介绍 */}
        <div className='mv-info'>
          <div className='info-header'>MV介绍</div>
          <div className='release-time'>发布时间：{mvDetail?.publishTime}</div>
          <div className='play-count'>播放次数：{mvDetail?.playCount}次</div>
          <div className='tags'>
            标签：<span className='link'>占位标签</span>
          </div>
        </div>
        {/* 相似mv */}
        <div className='simi-mvs-gallery'>
          {simiMvs?.slice(0, 8).map(item => (
            <MvItem type='in-detail-page' key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
