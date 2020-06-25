import React, { ComponentProps, useReducer, useEffect, Fragment } from 'react'

import './Home.scss'
import View from 'baseUI/UI/View'
import Swiper from 'baseUI/structure/Swiper'
import fetch from 'api/fetch'
import Image from 'baseUI/UI/Image'
import Text from 'baseUI/UI/Text'
import Button from 'baseUI/UI/Button'
import Icon from 'baseUI/UI/Icon'
import { headset } from 'assets/icons'

type State = {
  banners: Banner[]
  recommendResource: RecommendResource[]
  exclusiveContent: ExclusiveContent[]
  topSongs: TopSong[]
  mvs: MV[]
}
type Action = {
  type: 'set'
  banners?: State['banners']
  recommendResource?: State['recommendResource']
  exclusiveContent?: State['exclusiveContent']
  topSongs?: State['topSongs']
  mvs?: State['mvs']
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        banners: action.banners ?? state.banners,
        recommendResource: action.recommendResource ?? state.recommendResource,
        exclusiveContent: action.exclusiveContent ?? state.exclusiveContent,
        topSongs: action.topSongs ?? state.topSongs,
        mvs: action.mvs ?? state.mvs
      }
    default:
      return state
  }
}

const Home = (props: ComponentProps<typeof View>) => {
  const [state, dispatch] = useReducer(reducer, {
    banners: [],
    recommendResource: [],
    exclusiveContent: [],
    topSongs: [],
    mvs: []
  })

  useEffect(() => {
    Promise.all([
      fetch('/banner'),
      fetch('/recommend/resource'),
      fetch('/personalized/privatecontent'),
      fetch('/top/song'),
      fetch('/personalized/mv')
    ]).then(([bannersRes, recommendResourceRes, exclusiveContentRes, topSongsRes, mvsRes]) => {
      dispatch({
        type: 'set',
        banners: bannersRes?.data.banners,
        recommendResource: recommendResourceRes?.data.recommend,
        exclusiveContent: exclusiveContentRes?.data.result,
        topSongs: topSongsRes?.data.data,
        mvs: mvsRes?.data.result
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
      {/* TODO 提取成<Grid>组件 */}
      <View className='section-header'>
        <Text h2>推荐歌单</Text>
        <Button className='detail'>
          <Text>更多</Text>
          <Text>{'>'}</Text>
        </Button>
      </View>
      <View className='recommand-playlists'>
        <View>
          <View className='picture daily'>
            <View className='thumbnail recommand' />
            <Text className='day'>星期三</Text>
            <Text className='date'>17</Text>
          </View>
          <Text className='legend'>每日歌曲推荐</Text>
        </View>
        {state.recommendResource.slice(0, 9).map(resource => (
          <View key={resource.name.slice(0, 6)}>
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
            <Text className='legend'>{resource.name}</Text>
          </View>
        ))}
      </View>

      {/* 独家放送 */}
      <View className='section-header'>
        <Text h2>独家放送</Text>
        <Button className='detail'>
          <Text>更多</Text>
          <Text>{'>'}</Text>
        </Button>
      </View>
      <View className='exclusive-contents'>
        {state.exclusiveContent.slice(0, 3).map(resource => (
          <View key={resource.name.slice(0, 6)}>
            <View className='picture'>
              <Image className='thumbnail' src={resource.sPicUrl} />
            </View>
            <Text className='legend'>{resource.name}</Text>
          </View>
        ))}
      </View>

      {/* 最新音乐 */}
      <View className='section-header'>
        <Text h2>最新音乐</Text>
        <Button className='detail'>
          <Text>更多</Text>
          <Text>{'>'}</Text>
        </Button>
      </View>
      <View className='top-songs'>
        {state.topSongs.slice(0, 10).map((resource, index) => (
          <View key={resource.name.slice(0, 6)}>
            <Text className='no'>{index + 1}</Text>
            <Image className='album-thumbnail' src={resource.album.blurPicUrl} />
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
      </View>

      {/* 推荐mv */}
      <View className='section-header'>
        <Text h2>推荐mv</Text>
        <Button className='detail'>
          <Text>更多</Text>
          <Text>{'>'}</Text>
        </Button>
      </View>
      <View className='mvs'>
        {state.mvs.slice(0, 4).map(resource => (
          <View key={resource.name.slice(0, 6)}>
            <View className='picture'>
              <View className='legend'>
                <Text>{resource.copywriter}</Text>
              </View>
              <View className='count'>
                {/* TODO - 换掉icon */}
                <Icon src={headset} />
                <Text className='number'>{resource.playCount}</Text>
              </View>
              <Image src={resource.picUrl} className='thumbnail' />
            </View>
            <Text className='legend'>{resource.name}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
export default Home