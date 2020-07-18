import React, { ComponentProps, useReducer, useEffect, useContext, Fragment } from 'react'
import './style.scss'

import fetch from 'api/fetch'
import { RouterContext } from 'context/router'
import { recoder } from 'assets/icons'
import View from 'baseUI/UI/View'
import Image from 'baseUI/UI/Image'
import Text from 'baseUI/UI/Text'
import Icon from 'baseUI/UI/Icon'
import { overwrite } from 'functions/object'
import CommentItem from 'components/CommentItem'

const initState = {
  mvUrl: '' as Url,
  simiMvs: [] as MvBrief2[],
  commentInfo: {
    more: true,
    total: 0,
    hotComments: [] as CommentItem[],
    comments: [] as CommentItem[]
  },
  statisticData: {
    /**总点赞数 */
    likedCount: undefined as number | undefined,
    shareCount: undefined as number | undefined,
    commentCount: undefined as number | undefined,
    /**是否已点赞 */
    liked: false
  },
  mvDetail: {} as MvDetail
}
type State = typeof initState
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

export default function MvDetailPage(
  props: ComponentProps<typeof View> & {
    id: ID
  }
) {
  const [state, dispatch] = useReducer(reducer, initState)
  const [, routeDispatch] = useContext(RouterContext)
  const MvIntroItem = (props: { resource: MvBrief2 }) => (
    <View key={props.resource.id} className='mv-intro-item'>
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
        <Image src={props.resource.cover} className='thumbnail' />
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
  useEffect(() => {
    Promise.all([
      fetch('/mv/url', { id: props.id }),
      fetch('/simi/mv', { mvid: props.id }),
      fetch('/comment/mv', { id: props.id }),
      fetch('/mv/detail/info', { mvid: props.id }),
      fetch('/mv/detail', { mvid: props.id })
    ]).then(reses => {
      dispatch({
        type: 'set from data',
        mvUrl: reses[0]?.data.data.url,
        simiMvs: reses[1]?.data.mvs,
        commentInfo: reses[2]?.data,
        statisticData: {
          likedCount: reses[3]?.data.likedCount,
          shareCount: reses[3]?.data.shareCount,
          commentCount: reses[3]?.data.commentCount,
          liked: reses[3]?.data.liked ?? false
        },
        mvDetail: reses[4]?.data.data
      })
    })
  }, [props.id])
  return (
    <section className='MvDetailPage'>
      <Text>mvId: {props.id}</Text>

      <video className='mv-window' src={state.mvUrl} controls />

      {/* 相似mv */}
      <div className='_simi-mvs'>
        {state.simiMvs.slice(0, 8).map(item => (
          <MvIntroItem key={item.id} resource={item} />
        ))}
      </div>

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
