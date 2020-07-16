import React, { useContext, ComponentProps } from 'react'
import './DetailRouter.scss'

import { RouterContext } from 'context/router'
import Home from './Home'
import MvListPage from './MvListPage'
import NormalPlaylist from './NormalPlaylist'
import View from 'baseUI/UI/View'
import MvDetailPage from './MvDetailPage'

export default function DetailRouter(props: ComponentProps<typeof View>): JSX.Element {
  const [appRoute] = useContext(RouterContext)
  const ResultNode = () => {
    switch (appRoute.last.name) {
      case 'mvDetail':
        return <MvDetailPage id={appRoute.last.id ?? ''} {...props} />
      case 'menu': {
        switch (appRoute.last.id) {
          case 1:
            return <Home {...props} />
          case 2:
            return <MvListPage {...props} />
          default:
            return <View>未知menuID：{appRoute.last.id}</View>
        }
      }
      case 'playlist': {
        return <NormalPlaylist id={appRoute.last.id ?? ''} {...props} />
      }
      default:
        return <View>空白内容页</View>
    }
  }
  return (
    <section className='detail-router'>
      <ResultNode />
    </section>
  )
}
