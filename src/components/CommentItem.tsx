import React from 'react'
import './CommentItem.scss'

export default function CommentItem(props: {
  avatarUrl: SrcUrl
  nickname: Name
  content: Scentence
  time: TimeNumber
}): JSX.Element {
  return (
    <div className='_gc _comment-item'>
      <img className='_gi avatar' src={props.avatarUrl}></img>
      <p className='_gi _middle'>
        <span className='username'>{props.nickname}:</span>
        <span className='content'>{props.content}</span>
      </p>
      <div className='_gi create-time'>{props.time}</div>
      <div className='_gi _btns'>
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