import React, { ComponentProps, useContext, Fragment } from 'react'
import './style.scss'

import { AllResponse } from 'typings/requestPath'
import { RouterContext } from 'context/router'
import { recoder } from 'assets/icons'
import View from 'baseUI/UI/View'
import Text from 'baseUI/UI/Text'
import Icon from 'baseUI/UI/Icon'
import CommentItem from 'components/CommentItem'
import { useResource } from 'hooks/useFetch'
import MyCover from 'components/MyCover'

export default function MvDetailPage(
  props: ComponentProps<typeof View> & {
    id: ID
  }
) {
  const [, routeDispatch] = useContext(RouterContext)
  const MvIntroItem = (props: { resource: MvBrief2 }) => (
    <View key={props.resource.id} className='mv-entry'>
      <View
        className='picture'
        onClick={() => {
          routeDispatch({ type: 'to', item: { name: 'mvDetail', id: props.resource.id } })
        }}
      >
        <View className='count'>
          <Icon src={recoder} />
          <Text className='number'>{props.resource.playCount}</Text>
        </View>
        <MyCover src={props.resource.cover} className='thumbnail' />
      </View>
      <Text className='description'>{props.resource.name}</Text>
      <Text className='subDescription' footnote block>
        {props.resource.artists.map((art, idx, { length }) => (
          <Fragment key={art.id}>
            <Text>{art.name}</Text>
            {idx !== length - 1 && <Text>/</Text>}
          </Fragment>
        ))}
      </Text>
    </View>
  )
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
  // const mvDetail = useResource<AllResponse['/mv/detail']>('/mv/detail', {
  //    mvid: props.id
  // }).data?.data

  return (
    <section className='MvDetailPage'>
      <Text>mvId: {props.id}</Text>

      <video className='mv-window' src={mvUrl} controls />

      {/* 相似mv */}
      <div className='simi-mvs-gallery'>
        {simiMvs?.slice(0, 8).map(item => (
          <MvIntroItem key={item.id} resource={item} />
        ))}
      </div>

      {/* 评论词条 */}
      <div className='_comments'>
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
    </section>
  )
}
