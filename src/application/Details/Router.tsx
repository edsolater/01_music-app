import React, { useContext, ComponentProps } from 'react'

import { PlaylistIdContext } from 'appContext/playlistId'
import Home from './Home'
import NormalPlaylist from './NormalPlaylist'
import View from 'baseUI/UI/View'

export default function Router(props: ComponentProps<typeof View>) {
  const [playlistId] = useContext(PlaylistIdContext)
  return <>{playlistId === 1 ? <Home {...props} /> : <NormalPlaylist {...props} />}</>
}
