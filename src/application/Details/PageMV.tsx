import React, { ComponentProps, useReducer, useEffect, Fragment } from 'react'

import './PageMV.scss'
import View from 'baseUI/UI/View'
import fetch from 'api/fetch'
import Image from 'baseUI/UI/Image'
import Text from 'baseUI/UI/Text'
import Icon from 'baseUI/UI/Icon'
import { recoder } from 'assets/icons'
import SectionHeader from 'components/SectionHeader'

type State = {
  newMVs: MVIntro2[]
  hotMVs: MVIntro2[]
}
type Action = {
  type: 'set'
  newMVs?: State['newMVs']
  hotMVs?: State['hotMVs']
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        newMVs: action.newMVs ?? state.newMVs,
        hotMVs: action.hotMVs ?? state.hotMVs
      }
    default:
      return state
  }
}

const PageMV = (props: ComponentProps<typeof View>) => {
  const [state, dispatch] = useReducer(reducer, {
    newMVs: [],
    hotMVs: []
  })

  useEffect(() => {
    Promise.all([fetch('/mv/all', { order: '最新' }), fetch('/mv/all', { order: '最热' })]).then(
      reses => {
        dispatch({
          type: 'set',
          newMVs: reses[0]?.data.data,
          hotMVs: reses[1]?.data.data
        })
      }
    )
  }, [])

  const MVIntroItem = (props: { resource: MVIntro2 }) => (
    <View key={props.resource.id} className='mv-intro-item'>
      <View className='picture'>
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
    <View as='section' {...props} className='page-mv'>
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
    </View>
  )
}
export default PageMV
