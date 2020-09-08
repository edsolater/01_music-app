import React, { useContext, ComponentProps } from 'react'
import './style.scss'

import { RouterContext } from 'context/router'
import Home from './Home'
import MvGalleryPage from './MvGalleryPage'
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
            return <MvGalleryPage {...props} />
          default:
            return <div>未知menuID：{appRoute.last.id}</div>
        }
      }
      case 'playlist': {
        return <NormalPlaylist id={appRoute.last.id ?? ''} {...props} />
      }
      default:
        return <Home {...props} />
    }
  }
  return (
    <section className='DetailRouter'>
      <ResultNode />
    </section>
  )
}
