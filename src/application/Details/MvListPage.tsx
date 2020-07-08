import React, { ComponentProps, useReducer, useEffect, Fragment, useContext } from 'react'

import './MvListPage.scss'
import View from 'baseUI/UI/View'
import fetch from 'api/fetch'
import Image from 'baseUI/UI/Image'
import Text from 'baseUI/UI/Text'
import Icon from 'baseUI/UI/Icon'
import { recoder } from 'assets/icons'
import SectionHeader from 'components/SectionHeader'
import { RouterContext } from 'context/router'
import { overlay } from 'functions/object'

type State = {
  newMVs: MVBrief2[]
  hotMVs: MVBrief2[]
  neteaseMVs: MVBrief2[]
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

export default function PageMV(props: ComponentProps<typeof View>) {
  const [, routeDispatch] = useContext(RouterContext)
  const [state, dispatch] = useReducer(reducer, {
    newMVs: [],
    hotMVs: [],
    neteaseMVs: []
  })

  useEffect(() => {
    Promise.all([
      fetch('/mv/all', { order: '最新' }),
      fetch('/mv/all', { order: '最热' }),
      fetch('/mv/exclusive/rcmd')
    ]).then(reses => {
      dispatch({
        type: 'set',
        newMVs: reses[0]?.data.data,
        hotMVs: reses[1]?.data.data,
        neteaseMVs: reses[2]?.data.data
      })
    })
  }, [])

  const MVIntroItem = (props: { resource: MVBrief2 }) => (
    <View key={props.resource.id} className='mv-intro-item'>
      <View
        className='picture'
        onClick={() => {
          routeDispatch({ type: 'push', item: { name: 'mvDetail', id: props.resource.id } })
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
  return (
    <View as='section' {...props} className='mv-list-page'>
      {/* 最新MV */}
      <SectionHeader sectionName='最新MV' />
      <View className='new-mvs'>
        {state.newMVs.slice(0, 8).map(resource => (
          <MVIntroItem key={resource.id} resource={resource} />
        ))}
      </View>

      {/* 最热MV */}
      <SectionHeader sectionName='最热MV' />
      <View className='hot-mvs'>
        {state.hotMVs.slice(0, 8).map(resource => (
          <MVIntroItem key={resource.id} resource={resource} />
        ))}
      </View>

      {/* 网易出品MV */}
      <SectionHeader sectionName='网易出品' />
      <View className='netease-mvs'>
        {state.neteaseMVs.slice(0, 8).map(resource => (
          <MVIntroItem key={resource.id} resource={resource} />
        ))}
      </View>
    </View>
  )
}
