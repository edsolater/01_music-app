import React, { useReducer, useContext, useState, useEffect, ComponentProps } from 'react'
import dayjs from 'dayjs'

import './index.scss'
import duration from 'utils/duration'
import { requestPlaylistDetail, ResponsePlaylistDetail } from 'requests/playlist/detail'
import { LikelistContext } from 'appContext/likelist'
import { SongInfoContext } from 'appContext/SongInfo'
import { PlaylistIdContext } from 'appContext/playlistId'
import Text from 'baseUI/UI/Text'
import Image from 'baseUI/UI/Image'
import Togger from 'baseUI/UI/Togger'
import View from 'baseUI/UI/View'
import Figure from 'baseUI/UI/Figure'
import Avatar from 'baseUI/UI/Avatar'
import Group from 'baseUI/UI/Group'
import Button from 'baseUI/UI/Button'
import Icon from 'baseUI/UI/Icon'
import Item from 'baseUI/UI/Item'
import List from 'baseUI/structure/List'

type State = {
  selectedIndex: number
}
type Action = { type: 'set selected list index'; index: State['selectedIndex'] }

const initState: State = {
  selectedIndex: NaN
}
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set selected list index':
      return { ...state, selectedIndex: action.index }
    default:
      return state
  }
}

export default function Home(props: ComponentProps<typeof View>) {
  /* ----------------------------------- 状态 ----------------------------------- */

  const [playlistId] = useContext(PlaylistIdContext)

  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <View as='section' className='detail-area' {...props}>
      this is home
    </View>
  )
}
