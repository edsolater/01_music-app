import React, { useContext, ComponentProps } from 'react'

import { PlaylistIdContext } from 'appContext/playlistId'
import Home from './Home'
import NormalPlaylist from './NormalPlaylist'
import View from 'baseUI/UI/View'

export default function DetailRouter(props: ComponentProps<typeof View>) {
  const [playlistId] = useContext(PlaylistIdContext)
  return (
    <View className='detail-router'>
      {playlistId === 1 ? <Home {...props} /> : <NormalPlaylist {...props} />}
    </View>
  )
}