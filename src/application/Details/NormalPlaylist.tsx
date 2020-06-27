import React, { useReducer, useContext, useState, useEffect, ComponentProps } from 'react'
import dayjs from 'dayjs'

import './NormalPlaylist.scss'
import duration from 'functions/duration'
import { requestPlaylistDetail, ResponsePlaylistDetail } from 'requests/playlist/detail'
import { LikelistContext } from 'context/likelist'
import { SongInfoContext } from 'context/SongInfo'
import { PlaylistIdContext } from 'context/playlistId'
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

export default function NormalPlaylist(props: ComponentProps<typeof View>) {
  /* ----------------------------------- 状态 ----------------------------------- */

  const [playlistId] = useContext(PlaylistIdContext)
  const [likelist] = useContext(LikelistContext)
  const [, songInfoDispatch] = useContext(SongInfoContext)

  /* ----------------------------------- 请求 ----------------------------------- */

  const [response, setResponse] = useState<ResponsePlaylistDetail>({})
  useEffect(() => {
    requestPlaylistDetail({ id: playlistId })?.then(({ data }) => {
      setResponse(data)
    })
  }, [playlistId])

  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <View as='section' {...props} className='normal-playlist'>
      <View className='title'>
        <Text subhead>歌单</Text>
      </View>
      <View as='header' className='collection-info'>
        <Figure className='thumbnail'>
          <Image src={response.playlist?.coverImgUrl} className='bg' />
        </Figure>
        <Text h1>{response.playlist?.name}</Text>
        <View className='creator'>
          <Avatar src={response.playlist?.creator.avatarUrl} className='avatar' />
          <Text subhead className='nickname'>
            {response.playlist?.creator.nickname}
          </Text>
          <Text footnote className='create-time'>
            {dayjs(response.playlist?.createTime).format('YYYY-MM-DD')} 创建
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
      </View>
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
          <View as='input' className='input' html={{ placeholder: '搜索歌单歌曲' }} />
          <Icon iconfontName='search' />
        </View>
      </Group>
      <List
        data={response.playlist?.tracks}
        itemKey={item => item.id}
        initSelectedIndex={state.selectedIndex}
        onSelectItem={(item, index) => {
          dispatch({ type: 'set selected list index', index })
          //@ts-ignore
          songInfoDispatch({ type: 'set', songInfo: item })
        }}
        renderItem={(item, idx) => (
          <Item>
            <View className='song-index'>
              <Text>{String(idx).padStart(2, '0')}</Text>
            </View>
            <Togger
              className='indicator-like'
              justShow
              active={likelist.includes(item.id)}
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
              {Number(response.privileges?.[idx].downloadMaxbr) >= 999000 && (
                <Icon iconfontName='sq' />
              )}
            </Group>
          </Item>
        )}
      />
    </View>
  )
}
