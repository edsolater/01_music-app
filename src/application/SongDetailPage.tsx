import React, { ComponentProps, useReducer, useEffect, useContext, Fragment } from 'react'
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

export default function SongDetailPage(
  props: ComponentProps<typeof View> & {
    id: ID
  }
) {
  const [state, dispatch] = useReducer(reducer, initState)
  const [, routeDispatch] = useContext(RouterContext)
  useEffect(() => {
    Promise.all([]).then(reses => {})
  }, [props.id])
  return (
    <section className='song-detail-page'>
      <Text>songId: {props.id}</Text>
    </section>
  )
}
