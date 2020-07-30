import React, { Fragment, useContext } from 'react'
import './style.scss'

import View from 'baseUI/UI/View'
import Swiper from 'baseUI/structure/Swiper'
import { AllResponse } from 'typings/requestPath'
import Image from 'baseUI/UI/Image'
import Text from 'baseUI/UI/Text'
import Icon from 'baseUI/UI/Icon'
import { headset, recoder } from 'assets/icons'
import SectionHeader from 'components/SectionHeader'
import { RouterContext } from 'context/router'
import { useResource } from 'hooks/useFetch'

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
      <section className='_gc recommand-playlists'>
        <View>
          <View className='picture daily'>
            <View className='thumbnail recommand' />
            <Text className='day'>星期三</Text>
            <Text className='date'>17</Text>
          </View>
          <Text className='legend'>每日歌曲推荐</Text>
        </View>
        {recommendResource?.slice(0, 9).map(resource => (
          <View key={resource.id}>
            <View className='picture'>
              <View className='legend'>
                <Text>{resource.copywriter}</Text>
              </View>
              <View className='count'>
                <Icon src={headset} />
                <Text className='number'>{resource.playcount}</Text>
              </View>
              <Image src={resource.picUrl} className='thumbnail' />
            </View>
            <Text className='description'>{resource.name}</Text>
          </View>
        ))}
      </section>

      {/* 独家放送 */}
      <SectionHeader sectionName='独家放送' />
      <section className='_gc exclusive-contents'>
        {exclusiveContent?.slice(0, 3).map(resource => (
          <View
            key={resource.id}
            onClick={() => {
              routeDispatch({ type: 'to', item: { name: 'mvDetail', id: resource.id } })
            }}
          >
            <View className='picture'>
              <Image className='thumbnail' src={resource.sPicUrl} />
            </View>
            <Text className='description'>{resource.name}</Text>
          </View>
        ))}
      </section>

      {/* 最新音乐 */}
      <SectionHeader sectionName='最新音乐' />
      <section className='_gc top-songs'>
        {topSongs?.slice(0, 10).map((resource, index) => (
          <View key={resource.id}>
            <Text className='no'>{index + 1}</Text>
            <Image className='album-thumbnail' src={resource.album.picUrl} />
            <Text className='name'>{resource.name}</Text>
            <Icon iconfontName='sq'></Icon>
            <Icon iconfontName='mv'></Icon>
            <View className='artists'>
              {resource.artists.map((artist, index, { length }) => (
                <Fragment key={artist.name}>
                  <Text className='artist'>{artist.name}</Text>
                  {index !== length - 1 && <Text className='slash'>/</Text>}
                </Fragment>
              ))}
            </View>
          </View>
        ))}
      </section>

      {/* 推荐mv */}
      <SectionHeader sectionName='推荐mv' />
      <section className='_gc mvs'>
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

      {/* 主播电台 */}
      <SectionHeader sectionName='主播电台' />
      <section className='_gc mvs'>
        {/* TODO 需要界面抽象 */}
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
      </section>
    </section>
  )
}
export default Home
