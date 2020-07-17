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

const initState = {}
type State = typeof initState
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
    Promise.all([]).then(reses => {})
  }, [songInfo.id])
  console.log('songInfo: ', songInfo)
  return (
    <section className={`song-detail-page ${props.shown ? 'shown' : 'hidden'}`}>
      <Text>songId: {songInfo.id}</Text>
    </section>
  )
}
