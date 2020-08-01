import React, { Fragment, useContext } from 'react'
import './style.scss'

import View from 'baseUI/UI/View'
import { AllResponse } from 'typings/requestPath'
import Image from 'baseUI/UI/Image'
import Text from 'baseUI/UI/Text'
import Icon from 'baseUI/UI/Icon'
import { recoder } from 'assets/icons'
import SectionHeader from 'components/SectionHeader'
import { RouterContext } from 'context/router'
import { useResource } from 'hooks/useFetch'

export default function PageMV() {
  const [, routeDispatch] = useContext(RouterContext)
  const newMvs = useResource<AllResponse['/mv/all']>('/mv/all', {
    order: '最新'
  }).data?.data
  const hotMvs = useResource<AllResponse['/mv/all']>('/mv/all', {
    order: '最热'
  }).data?.data
  const neteaseMvs = useResource<AllResponse['/mv/exclusive/rcmd']>('/mv/exclusive/rcmd').data?.data

  const MvIntroItem = (props: { resource: MvBrief2 }) => (
    <View key={props.resource.id} className='mv-entry'>
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
      <View className='new-mvs-gallery'>
        {newMvs?.slice(0, 8).map(resource => (
          <MvIntroItem key={resource.id} resource={resource} />
        ))}
      </View>

      {/* 最热MV */}
      <SectionHeader sectionName='最热MV' />
      <View className='hot-mvs-gallery'>
        {hotMvs?.slice(0, 8).map(resource => (
          <MvIntroItem key={resource.id} resource={resource} />
        ))}
      </View>

      {/* 网易出品MV */}
      <SectionHeader sectionName='网易出品' />
      <View className='netease-mvs-gallery'>
        {neteaseMvs?.slice(0, 8).map(resource => (
          <MvIntroItem key={resource.id} resource={resource} />
        ))}
      </View>
    </section>
  )
}
