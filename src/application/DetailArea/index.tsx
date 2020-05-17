import React from 'react'
import dayjs from 'dayjs'

import './index.scss'
import { List } from 'components/structure'
import { Text, Icon, Avatar, Button, Image } from 'components/UI'
import { View, Figure, Group, Cycle, Item } from 'components/wrappers'
import duration from 'utils/duration'
import useResponse from 'hooks/useResponse'
import { requestPlaylistDetail } from 'requests/playlist/detail'
import { useTypedSelector, useTypedDispatch } from 'redux/createStore'

export default function DetailArea() {
  const playlistId = useTypedSelector(s => s.inApp.playlistId)
  const likeList = useTypedSelector(s => s.fromResponse.likeList)
  const dispatch = useTypedDispatch()
  const response = useResponse(requestPlaylistDetail, { id: playlistId })
  return (
    <View as='section' className='detail-area'>
      <View className='title'>
        <Text subhead>歌单</Text>
      </View>
      <View as='header' className='collection-info'>
        <Figure className='thumbnail'>
          <Image src={response.playlist?.coverImgUrl} className='bg' />
        </Figure>
        <Text title1>{response.playlist?.name}</Text>
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
        data={response.playlist?.tracks.map((songObj, idx) => ({
          ...songObj,
          ...response.privileges[idx],
        }))}
        itemKey={item => item.id}
        initSelectedIndex={NaN}
        onSelectItem={item => {
          //@ts-ignore
          dispatch({ type: 'SET_SONG_INFO', songInfo: item })
        }}
        renderItem={(item, idx) => (
          <Item>
            <View className='song-index'>
              <Text>{String(idx).padStart(2, '0')}</Text>
            </View>
            <Cycle
              className='indicator-like'
              initActiveIndex={likeList.includes(item.id) ? 0 : 1}
              itemList={[
                // TODO - 为了灵活性需要overload支持单纯传ReactNode的情况
                {
                  node: <Icon iconfontName='heart' />,
                  onActive: () => {
                    console.log('full')
                  },
                },
                {
                  node: <Icon iconfontName='heart_empty' />,
                  onActive: () => {
                    console.log('heart_empty')
                  },
                },
              ]}
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
              {item.downloadMaxbr >= 999000 && <Icon iconfontName='sq' />}
            </Group>
          </Item>
        )}
      />
    </View>
  )
}