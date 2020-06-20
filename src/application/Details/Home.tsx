import React, { ComponentProps, useReducer, useEffect } from 'react'

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
}
type Action = {
  type: 'set'
  banners?: State['banners']
  recommendResource?: State['recommendResource']
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        banners: action.banners ?? state.banners,
        recommendResource: action.recommendResource ?? state.recommendResource
      }
    default:
      return state
  }
}

const Home = (props: ComponentProps<typeof View>) => {
  const [state, dispatch] = useReducer(reducer, {
    banners: [],
    recommendResource: []
  })

  useEffect(() => {
    fetch('/banner')?.then(({ data }) => dispatch({ type: 'set', banners: data.banners }))
  }, [])

  useEffect(() => {
    fetch('/recommend/resource')?.then(({ data }) => {
      console.log(data.recommend)
      return dispatch({ type: 'set', recommendResource: data.recommend })
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
      <View as='header' hidden>
        <Text h2>推荐歌单</Text>
        <Button className='detail'>
          <Text>更多</Text>
          <Text>{'>'}</Text>
        </Button>
      </View>
      <View className='recommand-playlists'>
        <View>
          <View className='picture'>
            <View className='thumbnail recommand' />
            <Text className='day'>星期三</Text>
            <Text className='date'>17</Text>
          </View>
          <Text className='legend'>每日歌曲推荐</Text>
        </View>
        {state.recommendResource.slice(0, 9).map(resource => (
          <View>
            <View className='picture'>
              <View className='legend'>
                <Text>{resource.copywriter}</Text>
              </View>
              <View className='count'>
                <Icon src={headset} />
                <View className='number'>{resource.playcount}</View>
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
