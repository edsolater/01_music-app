import React, { useContext } from 'react'
import './style.scss'

import Swiper from 'baseUI/structure/Swiper'
import { AllResponse } from 'typings/requestPath'
import SectionHeader from 'components/SectionHeader'
import { useResource } from 'hooks/useFetch'
import PlaylistItem from 'components/PlaylistItem'
import MvItem from 'components/MvItem'
import SongItem from 'components/SongItem'
import { padLeft, getDay, getDate } from 'utils/functions'
import { SongInfoContext } from 'context/SongInfo'
import MyCover from 'components/MyCover'

const Home = () => {
  const { setSongId } = useContext(SongInfoContext)
  const banners = useResource<AllResponse['/banner']>('/banner').res?.banners
  const recommendResource = useResource<AllResponse['/recommend/resource']>('/recommend/resource')
    .res?.recommend
  const exclusiveContent = useResource<AllResponse['/personalized/privatecontent']>(
    '/personalized/privatecontent'
  ).res?.result
  const topSongs = useResource<AllResponse['/top/song']>('/top/song').res?.data
  const mvs = useResource<AllResponse['/personalized/mv']>('/personalized/mv').res?.result
  // const djSites = useResource<AllResponse['/dj/today/perfered']>('/dj/today/perfered').data?.data

  return (
    <section className='Home'>
      <Swiper
        autoPlay
        renderList={banners?.map(banner => (
          <MyCover
            key={banner.imageUrl.slice(24, 29)}
            src={banner.imageUrl}
            onClick={() => window.open(banner.url)}
          />
        ))}
      />

      {/* 推荐歌单 */}
      <SectionHeader sectionName='推荐歌单' />
      <section className='recommend-playlists-gallery'>
        <PlaylistItem
          type='daily-recommend'
          dailyInfo={{ day: getDay('星期x'), date: getDate() }}
        />
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
          <div
            key={item.id}
            className='rank-item _clickable'
            onClick={() => {
              setSongId(item.id)
            }}
          >
            <span className='rank'>{padLeft(index + 1, 2, 0)}</span>
            <SongItem type='in-home' item={item} />
          </div>
        ))}
      </section>

      {/* 推荐mv */}
      <SectionHeader sectionName='推荐mv' />
      <section className='mvs-gallery'>
        {mvs?.slice(0, 4).map(item => (
          <MvItem key={item.id} type='in-home' item={item} />
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
