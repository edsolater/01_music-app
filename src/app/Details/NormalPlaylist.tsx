import React, { useReducer, useContext, ComponentProps } from 'react'
import './style.scss'

import duration from 'utils/duration'
import { AllResponse } from 'typings/requestPath'
import { LikelistContext } from 'context/likelist'
import { SongInfoContext } from 'context/SongInfo'
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
import { useResource } from 'hooks/useFetch'
import { getDateString } from 'utils/functions'

type State = {
  selectedIndex: number
}
type Action =
  | { type: 'set selected list index'; index: State['selectedIndex'] }
  | ({
      type: 'set from data'
    } & Partial<State>)

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

export default function NormalPlaylist(props: ComponentProps<typeof View> & { id: ID }) {
  /* ----------------------------------- 状态 ----------------------------------- */

  const [likelist] = useContext(LikelistContext)
  const [, songInfoContextDispatch] = useContext(SongInfoContext)
  const [state, dispatch] = useReducer(reducer, initState)

  /* ----------------------------------- 请求 ----------------------------------- */

  const { playlist, privileges } =
    useResource<AllResponse['/playlist/detail']>('/playlist/detail', {
      id: props.id
    }).data ?? {}

  return (
    <section className='NormalPlaylist'>
      <div className='title'>
        <Text subhead>歌单</Text>
      </div>
      <header className='playlist-info'>
        <Figure className='thumbnail'>
          <Image src={playlist?.coverImgUrl} className='bg' />
        </Figure>
        <Text h1>{playlist?.name}</Text>
        <View className='creator'>
          <Avatar src={playlist?.creator.avatarUrl} className='avatar' />
          <Text subhead className='nickname'>
            {playlist?.creator.nickname}
          </Text>
          <Text footnote className='create-time'>
            {getDateString(playlist?.createTime)} 创建
          </Text>
        </View>
        <Group className='buttons'>
          <Button styleType='has-border' size='small'>
            <Icon iconfontName='collection-folder' />
            <Text>收藏</Text>
          </Button>
          <Button styleType='has-border' size='small'>
            <Icon iconfontName='message' />
            <Text>评论</Text>
          </Button>
          <Button styleType='has-border' size='small'>
            <Icon iconfontName='shut-down' />
            <Text>分享</Text>
          </Button>
          <Button styleType='has-border' size='small'>
            <Icon iconfontName='download' />
            <Text>下载全部</Text>
          </Button>
          <Button styleType='has-border' size='small'>
            <Icon iconfontName='more-info' />
            <Text>更多</Text>
          </Button>
        </Group>
      </header>
      <Group className='list-operator'>
        <Button className='play-all-btn'>
          <Icon iconfontName='play-all' />
          <Text>全部播放</Text>
        </Button>
        <Button className='select-btn'>
          <Icon iconfontName='select-panel' />
          <Text>选择</Text>
        </Button>
        <View className='search-slot'>
          <View as='input' className='input' originProps={{ placeholder: '搜索歌单歌曲' }} />
          <Icon iconfontName='search' />
        </View>
      </Group>
      <List
        data={playlist?.tracks}
        itemKey={item => item.id}
        initSelectedIndex={state.selectedIndex}
        onSelectItem={(item, index) => {
          dispatch({ type: 'set selected list index', index })
          //@ts-ignore
          songInfoContextDispatch({ type: 'set from data', songInfo: item })
        }}
        renderItem={(item, idx) => (
          <Item className='--clickable'>
            <View className='song-index'>
              <Text>{String(idx).padStart(2, '0')}</Text>
            </View>
            <Togger
              className='indicator-like'
              justShow
              active={likelist.has(item.id)}
              trusyNode={<Icon iconfontName='heart' />}
              falsyNode={<Icon iconfontName='heart_empty' />}
            />
            <View className='song-name'>
              <Text className='main-name'>{item.name}</Text>
              <Text className='sub-name'>{item.alia}</Text>
            </View>
            <View className='author'>
              <Text>{item.ar[0].name}</Text>
            </View>
            <View className='album-name'>
              <Text>{item.al.name}</Text>
            </View>
            <View className='total-seconds'>
              <Text>{duration(item.dt).format('mm:ss')}</Text>
            </View>
            <Group className='song-badges'>
              {Number(privileges?.[idx].downloadMaxbr) >= 999000 && <Icon iconfontName='sq' />}
            </Group>
          </Item>
        )}
      />
    </section>
  )
}
