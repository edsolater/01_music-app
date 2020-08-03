import React from 'react'
import './style.scss'

import View from 'baseUI/UI/View'
import { AllResponse } from 'typings/requestPath'
import SectionHeader from 'components/SectionHeader'
import { useResource } from 'hooks/useFetch'
import MvItem from 'components/MvItem'

export default function MvGalleryPage() {
  const newMvs = useResource<AllResponse['/mv/all']>('/mv/all', {
    order: '最新'
  }).res?.data
  const hotMvs = useResource<AllResponse['/mv/all']>('/mv/all', {
    order: '最热'
  }).res?.data
  const neteaseMvs = useResource<AllResponse['/mv/exclusive/rcmd']>('/mv/exclusive/rcmd').res?.data

  return (
    <section className='MvGalleryPage'>
      {/* 最新MV */}
      <SectionHeader sectionName='最新MV' />
      <View className='new-mvs-gallery'>
        {newMvs?.slice(0, 8).map(resource => (
          <MvItem type='brief2' key={resource.id} item={resource} />
        ))}
      </View>

      {/* 最热MV */}
      <SectionHeader sectionName='最热MV' />
      <View className='hot-mvs-gallery'>
        {hotMvs?.slice(0, 8).map(resource => (
          <MvItem type='brief2' key={resource.id} item={resource} />
        ))}
      </View>

      {/* 网易出品MV */}
      <SectionHeader sectionName='网易出品' />
      <View className='netease-mvs-gallery'>
        {neteaseMvs?.slice(0, 8).map(resource => (
          <MvItem type='brief2' key={resource.id} item={resource} />
        ))}
      </View>
    </section>
  )
}
