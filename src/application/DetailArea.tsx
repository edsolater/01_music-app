import React, { useMemo } from 'react'

import avatar from 'assets/头像.jpg' // 这个信息最终要靠后端传过来，现在只是占位
import avatar2 from 'assets/whiteEye--small.png' // 这个信息最终要靠后端传过来，现在只是占位
import soundtrackUrl from 'assets/ezio Family.mp3' // 这个信息最终要靠后端传过来，现在只是占位
import soundtrackUrl2 from 'assets/Aimer - STAND-ALONE.mp3' // 这个信息最终要靠后端传过来，现在只是占位
type PicUrl = string

import './DetailArea.scss'
import { heartIcon } from 'assets/icons'
import { List } from 'components/structure'
import { Text, Icon, Avatar, Button, Image } from 'components/UI'
import { View, Figure, Group, Cycle, Item } from 'components/wrappers'
import duration from 'utils/duration'
import useResponse from 'hooks/useResponse'
import { requestPlaylistDetail } from 'requests/playlist/detail'
import { useGlobalState } from 'App'
import dayjs from 'dayjs'

export default function DetailArea() {
  const globalState = useGlobalState()
  const currentCollectionInfo = {
    label: '我喜欢的音乐',
    creatorInfo: {
      avatar: avatar2 as PicUrl,
      nickName: 'edsolater',
    },
    thumbnail: avatar as PicUrl,
    createTime: '2016-09-13',
  }
  const currentCollectionMusicList = [
    {
      isLiked: true,
      songName: `ezio Family.mp3`,
      songSubname: '(游戏《刺客信条》配乐)',
      author: 'Jesper Kyd',
      albumName: "Assassin's Creed 2 (Original Game Soundtrack)（刺客信条2 原声大碟）",
      totalSeconds: 144,
      albumUrl: avatar as PicUrl,
      soundtrackUrl: soundtrackUrl,
      isSQ: true,
    },
    {
      songName: `Aimer - STAND-ALONE.mp3`,
      author: 'Aimer',
      albumName: 'STAND-ALONE',
      totalSeconds: 240,
      albumUrl: avatar2 as PicUrl,
      soundtrackUrl: soundtrackUrl2,
    },
    {
      songName: `Aimer - STAND-ALONE2.mp3`,
      author: 'Aimer',
      albumName: 'STAND-ALONE',
      totalSeconds: 240,
      albumUrl: avatar2 as PicUrl,
      soundtrackUrl: soundtrackUrl2,
    },
    {
      songName: `Aimer - STAND-ALONE3.mp3`,
      author: 'Aimer',
      albumName: 'STAND-ALONE',
      totalSeconds: 240,
      albumUrl: avatar2 as PicUrl,
      soundtrackUrl: soundtrackUrl2,
    },
    {
      songName: `Aimer - STAND-ALONE4.mp3`,
      author: 'Aimer',
      albumName: 'STAND-ALONE',
      totalSeconds: 240,
      albumUrl: avatar2 as PicUrl,
      soundtrackUrl: soundtrackUrl2,
    },
  ]
  const response = useResponse(requestPlaylistDetail, { id: globalState.playlistId })
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
        itemKey={(item) => item.id}
        initSelectedIndex={NaN}
        renderItem={(item, idx) => (
          <Item>
            <View className='song-index'>
              <Text>{String(idx).padStart(2, '0')}</Text>
            </View>
            <Cycle
              className='indicator-like'
              initActiveIndex={item.isLiked ? 0 : 1}
              itemList={[
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
        onSelectItem={() => {
          // TODO:store.playNewMusic(itemInfo)
        }}
      />
    </View>
  )
}
