import React, { ComponentProps, useReducer, useEffect } from 'react'

import './Home.scss'
import View from 'baseUI/UI/View'
import Swiper from 'baseUI/structure/Swiper'
import fetch from 'utils/fetch'
import Image from 'baseUI/UI/Image'
import Text from 'baseUI/UI/Text'
import Button from 'baseUI/UI/Button'

type State = {
  banners: Banner[]
}
type Action = { type: 'set'; banners?: State['banners'] }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set':
      return { ...state, banners: action.banners ?? state.banners }
    default:
      return state
  }
}

const Home = (props: ComponentProps<typeof View>) => {
  const [state, dispatch] = useReducer(reducer, {
    banners: []
  })

  useEffect(() => {
    fetch('/banner')?.then(({ data }) => dispatch({ type: 'set', banners: data.banners }))
  }, [])

  return (
    <View as='section' {...props} className={[props.className, 'home']}>
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
      <View className='grid row space-between'>
        <Text>推荐歌单</Text>
        <Button className='detail'>
          <Text>更多</Text>
          <Text>{'>'}</Text>
        </Button>
      </View>
    </View>
  )
}
export default Home
