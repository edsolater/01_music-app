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
  banners: Banner[]
  recommendResource: RecommendResource[]
  exclusiveContent: ExclusiveContent[]
  topSongs: TopSong[]
  pageMvs: MVIntro[]
  djSites: DJItemIntro[]
}
type Action = {
  type: 'set'
  banners?: State['banners']
  recommendResource?: State['recommendResource']
  exclusiveContent?: State['exclusiveContent']
  topSongs?: State['topSongs']
  pageMvs?: State['pageMvs']
  djSites?: State['djSites']
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
        pageMvs: action.pageMvs ?? state.pageMvs,
        djSites: action.djSites ?? state.djSites
      }
    default:
      return state
  }
}

const PageMV = (props: ComponentProps<typeof View>) => {
  const [state, dispatch] = useReducer(reducer, {
    banners: [],
    recommendResource: [],
    exclusiveContent: [],
    topSongs: [],
    pageMvs: [],
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
    ]).then(
      ([
        bannersRes,
        recommendResourceRes,
        exclusiveContentRes,
        topSongsRes,
        pageMvsRes,
        djPrefereds
      ]) => {
        dispatch({
          type: 'set',
          banners: bannersRes?.data.banners,
          recommendResource: recommendResourceRes?.data.recommend,
          exclusiveContent: exclusiveContentRes?.data.result,
          topSongs: topSongsRes?.data.data,
          pageMvs: pageMvsRes?.data.result,
          djSites: djPrefereds?.data.data
        })
      }
    )
  }, [])

  return <Text>hello</Text>
}
export default PageMV
