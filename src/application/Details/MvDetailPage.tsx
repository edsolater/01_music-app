import React, { ComponentProps, useReducer, useEffect } from 'react'
import fetch from 'api/fetch'
import View from 'baseUI/UI/View'
import Text from 'baseUI/UI/Text'
import { overlay } from 'functions/object'

type State = {
  mvUrl: Url
}
type Action = {
  type: 'set'
} & Partial<State>

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set':
      return overlay({ ...state }, action)
    default:
      return state
  }
}

export default function MvDetailPage(
  props: ComponentProps<typeof View> & {
    id: ID
  }
) {
  const [state, dispatch] = useReducer(reducer, { mvUrl: '' })
  useEffect(() => {
    Promise.all([fetch('/mv/url', { id: props.id })]).then(reses => {
      dispatch({
        type: 'set',
        mvUrl: reses[0]?.data.data.url
      })
    })
  }, [])
  return (
    <View className='Section'>
      <Text>mvId: {props.id}</Text>

      <video src={state.mvUrl} controls />
    </View>
  )
}
