import React, { Fragment, useContext } from 'react'
import './style.scss'

import View from 'baseUI/UI/View'
import Swiper from 'baseUI/structure/Swiper'
import { AllResponse } from 'typings/requestPath'
import Image from 'baseUI/UI/Image'
import Text from 'baseUI/UI/Text'
import Icon from 'baseUI/UI/Icon'
import { recoder } from 'assets/icons'
import SectionHeader from 'components/SectionHeader'
import { RouterContext } from 'context/router'
import { useResource } from 'hooks/useFetch'
import PlaylistItem from 'components/PlaylistItem'
import MvItem from 'components/MvItem'
import SongItem from 'components/SongItem'
import { padLeft } from 'utils/functions'

const Home = () => {
  const [, routeDispatch] = useContext(RouterContext)
  const banners = useResource<AllResponse['/banner']>('/banner').data?.banners
  const recommendResource = useResource<AllResponse['/recommend/resource']>('/recommend/resource')
    .data?.recommend
  const exclusiveContent = useResource<AllResponse['/personalized/privatecontent']>(
    '/personalized/privatecontent'
  ).data?.result
  const topSongs = useResource<AllResponse['/top/song']>('/top/song').data?.data
  const mvs = useResource<AllResponse['/personalized/mv']>('/personalized/mv').data?.result
  const djSites = useResource<AllResponse['/dj/today/perfered']>('/dj/today/perfered').data?.data

  return (
    <section className='Home'>
      <Swiper
        autoPlay
        renderList={banners?.map(banner => (
          <Image
            key={banner.imageUrl.slice(24, 29)}
            src={banner.imageUrl}
            onClick={() => window.open(banner.url)}
          />
        ))}
      />

      {/* 推荐歌单 */}
      <SectionHeader sectionName='推荐歌单' />
      <section className='recommend-playlists-gallery'>
        <PlaylistItem type='daily-recommend' dailyInfo={{ day: '星期三', date: '11' }} />
        {recommendResource?.slice(0, 9).map(item => (
          <PlaylistItem key={item.id} type='portrait' item={item} />
        ))}
      </section>

      {/* 独家放送 */}
      <SectionHeader sectionName='独家放送' />
      <section className='exclusive-contents-gallery'>
        {exclusiveContent?.slice(0, 3).map(resource => (
          <MvItem item={resource} key={resource.id} />
        ))}
      </section>

      {/* 最新音乐 */}
      <SectionHeader sectionName='最新音乐' />
      <section className='top-songs-gallery'>
        {topSongs?.slice(0, 10).map((item, index) => (
          <div key={item.id} className='rank-item --clickable'>
            <span className='rank'>{padLeft(index + 1, 2, 0)}</span>
            <SongItem type='in-home' item={item} />
          </div>
        ))}
      </section>

      {/* 推荐mv */}
      <SectionHeader sectionName='推荐mv' />
      <section className='mvs-gallery'>
        {mvs?.slice(0, 4).map(resource => (
          <View
            key={resource.id}
            onClick={() => {
              routeDispatch({ type: 'to', item: { name: 'mvDetail', id: resource.id } })
            }}
          >
            <View className='picture'>
              <View className='legend'>
                <Text>{resource.copywriter}</Text>
              </View>
              <View className='count'>
                <Icon src={recoder} />
                <Text className='number'>{resource.playCount}</Text>
              </View>
              <Image src={resource.picUrl} className='thumbnail' />
            </View>
            <Text className='description'>{resource.name}</Text>
            <Text className='subDescription' footnote block>
              {resource.artists.map((art, idx, { length }) => (
                <Fragment key={art.id}>
                  <Text>{art.name}</Text>
                  {idx !== length - 1 && <Text>/</Text>}
                </Fragment>
              ))}
            </Text>
          </View>
        ))}
      </section>

      {/* 主播电台
      <SectionHeader sectionName='主播电台' />
      <section className='mvs-gallery'>
        {djSites?.slice(0, 5).map(resource => (
          <View key={resource.id}>
            <View className='picture'>
              <View className='bottom'>
                <Text className='number'>{resource.name}</Text>
              </View>
              <Image src={resource.picUrl} className='thumbnail' />
            </View>
            <Text className='description'>{resource.rcmdText}</Text>
          </View>
        ))}
      </section> */}
    </section>
  )
}
export default Home
