import React, { ComponentProps, useReducer, useEffect, Fragment, useContext } from 'react'

import './Home.scss'
import View from 'baseUI/UI/View'
import Swiper from 'baseUI/structure/Swiper'
import fetch from 'api/fetch'
import Image from 'baseUI/UI/Image'
import Text from 'baseUI/UI/Text'
import Icon from 'baseUI/UI/Icon'
import { headset, recoder } from 'assets/icons'
import SectionHeader from 'components/SectionHeader'
import { RouterContext } from 'context/router'

type State = {
  banners: Banner[]
  recommendResource: RecommendResource[]
  exclusiveContent: ExclusiveContent[]
  topSongs: SongItem[]
  mvs: MvBrief[]
  djSites: DJItem[]
}
type Action = {
  type: 'set by data'
  banners?: State['banners']
  recommendResource?: State['recommendResource']
  exclusiveContent?: State['exclusiveContent']
  topSongs?: State['topSongs']
  mvs?: State['mvs']
  djSites?: State['djSites']
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set by data':
      return {
        ...state,
        banners: action.banners ?? state.banners,
        recommendResource: action.recommendResource ?? state.recommendResource,
        exclusiveContent: action.exclusiveContent ?? state.exclusiveContent,
        topSongs: action.topSongs ?? state.topSongs,
        mvs: action.mvs ?? state.mvs,
        djSites: action.djSites ?? state.djSites
      }
    default:
      return state
  }
}

const Home = (props: ComponentProps<typeof View>) => {
  const [, routeDispatch] = useContext(RouterContext)
  const [state, dispatch] = useReducer(reducer, {
    banners: [],
    recommendResource: [],
    exclusiveContent: [],
    topSongs: [],
    mvs: [],
    djSites: []
  })

  useEffect(() => {
    // TODO 路由切换还要再请求一次，不太对。应该把这个页面的state都保存起来
    Promise.all([
      fetch('/banner'),
      fetch('/recommend/resource'),
      fetch('/personalized/privatecontent'),
      fetch('/top/song'),
      fetch('/personalized/mv'),
      fetch('/dj/today/perfered')
    ]).then(reses => {
      dispatch({
        type: 'set by data',
        banners: reses[0]?.data.banners,
        recommendResource: reses[1]?.data.recommend,
        exclusiveContent: reses[2]?.data.result,
        topSongs: reses[3]?.data.data,
        mvs: reses[4]?.data.result,
        djSites: reses[5]?.data.data
      })
    })
  }, [])

  return (
    <View as='section' {...props} className='home'>
      <Swiper
        autoPlay
        renderList={state.banners.map(banner => (
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
        {state.recommendResource.slice(0, 9).map(resource => (
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
        {state.exclusiveContent.slice(0, 3).map(resource => (
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
        {state.topSongs.slice(0, 10).map((resource, index) => (
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
        {state.mvs.slice(0, 4).map(resource => (
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
        {state.djSites.slice(0, 5).map(resource => (
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
    </View>
  )
}
export default Home
