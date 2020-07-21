import React, { ComponentProps, useReducer, useEffect, Fragment, useContext } from 'react'
import './style.scss'

import View from 'baseUI/UI/View'
import fetch from 'api/fetch'
import Image from 'baseUI/UI/Image'
import Text from 'baseUI/UI/Text'
import Icon from 'baseUI/UI/Icon'
import { recoder } from 'assets/icons'
import SectionHeader from 'components/SectionHeader'
import { RouterContext } from 'context/router'
import { overwrite } from 'utils/object'

type State = typeof initState
type Action = {
  type: 'set from data'
} & Partial<State>

const initState = {
  newMVs: [] as MvBrief2[],
  hotMVs: [] as MvBrief2[],
  neteaseMVs: [] as MvBrief2[]
}
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set from data':
      return overwrite({ ...state }, action)
    default:
      return state
  }
}

export default function PageMV(props: ComponentProps<typeof View>) {
  const [, routeDispatch] = useContext(RouterContext)
  const [state, dispatch] = useReducer(reducer, initState)

  useEffect(() => {
    Promise.all([
      fetch('/mv/all', { order: '最新' }),
      fetch('/mv/all', { order: '最热' }),
      fetch('/mv/exclusive/rcmd')
    ]).then(reses => {
      dispatch({
        type: 'set from data',
        newMVs: reses[0]?.data.data,
        hotMVs: reses[1]?.data.data,
        neteaseMVs: reses[2]?.data.data
      })
    })
  }, [])

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
  return (
    <section className='MvListPage'>
      {/* 最新MV */}
      <SectionHeader sectionName='最新MV' />
      <View className='_new-mvs'>
        {state.newMVs.slice(0, 8).map(resource => (
          <MvIntroItem key={resource.id} resource={resource} />
        ))}
      </View>

      {/* 最热MV */}
      <SectionHeader sectionName='最热MV' />
      <View className='_hot-mvs'>
        {state.hotMVs.slice(0, 8).map(resource => (
          <MvIntroItem key={resource.id} resource={resource} />
        ))}
      </View>

      {/* 网易出品MV */}
      <SectionHeader sectionName='网易出品' />
      <View className='_netease-mvs'>
        {state.neteaseMVs.slice(0, 8).map(resource => (
          <MvIntroItem key={resource.id} resource={resource} />
        ))}
      </View>
    </section>
  )
}
