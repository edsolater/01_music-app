import React, { ComponentProps, useReducer, useEffect, Fragment } from 'react'

import './PageMV.scss'
import View from 'baseUI/UI/View'
import Swiper from 'baseUI/structure/Swiper'
import fetch from 'api/fetch'
import Image from 'baseUI/UI/Image'
import Text from 'baseUI/UI/Text'
import Icon from 'baseUI/UI/Icon'
import { headset, recoder } from 'assets/icons'
import SectionHeader from 'components/SectionHeader'

type State = {
  mvs: MVIntro2[]
}
type Action = {
  type: 'set'
  mvs?: State['mvs']
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        mvs: action.mvs ?? state.mvs
      }
    default:
      return state
  }
}

const PageMV = (props: ComponentProps<typeof View>) => {
  const [state, dispatch] = useReducer(reducer, {
    mvs: []
  })

  useEffect(() => {
    // TODO 路由切换还要再请求一次，不太对。应该把这个页面的state都保存起来
    Promise.all([fetch('/mv/first')]).then(([mvsRes]) => {
      dispatch({
        type: 'set',
        mvs: mvsRes?.data.data
      })
    })
  }, [])

  const RenderMVIntroItem = (props: { resource: MVIntro2 }) => (
    <View key={props.resource.id} className='render-mv-intro-item'>
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
        {state.mvs.slice(0, 8).map(resource => (
          <RenderMVIntroItem key={resource.id} resource={resource} />
        ))}
      </View>
    </View>
  )
}
export default PageMV
