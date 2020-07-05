import React, { useContext, ComponentProps } from 'react'
import { RouterContext } from 'context/router'
import Home from './Home'
import MvListPage from './MvListPage'
import NormalPlaylist from './NormalPlaylist'
import View from 'baseUI/UI/View'
import MvDetailPage from './MvDetailPage'

export default function DetailRouter(props: ComponentProps<typeof View>): JSX.Element {
  const [appRoute] = useContext(RouterContext)
  const ResultNode = (() => {
    switch (appRoute.last.name) {
      case 'mvDetail':
        return <MvDetailPage {...props} />
      case 'playlist': {
        // TODO: 先暂时这么写，等出效果了把‘全部页’‘视频列表页’拆出来
        const playlistId = appRoute.last.id
        switch (playlistId) {
          case 1:
            return <Home {...props} />
          case 2:
            return <MvListPage {...props} />
          default:
            return <NormalPlaylist {...props} />
        }
      }
      default:
        return <View>空白内容页</View>
    }
  })()
  return ResultNode
}
