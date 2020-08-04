import React from 'react'
import './style.scss'
import MyCover from './MyCover'

export default function CommentItem(props: {
  avatarUrl: SrcUrl
  nickname: Name
  content: Scentence
  time: TimeNumber
}): JSX.Element {
  return (
    <div className='CommentItem _clickable'>
      <MyCover className='avatar' src={props.avatarUrl} />
      <p className='middle-part'>
        <span className='username'>{props.nickname}:</span>
        <span className='content'>{props.content}</span>
      </p>
      <div className='create-time'>{props.time}</div>
      <div className='btn-group'>
        <div className='btn'>举报</div>
        <div className='divider' />
        <div className='btn'>分享</div>
        <div className='divider' />
        <div className='btn'>回复</div>
        <div className='divider' />
      </div>
    </div>
  )
}
