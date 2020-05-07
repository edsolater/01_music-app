import React, { useEffect } from 'react'

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
import useResponse, { deRequestReturnType } from 'hooks/useResponse'
import { requestPlaylistDetail } from 'requests/playlist/detail'
import { useGlobalState } from 'App'

export default function DetailArea() {
  const globalState = useGlobalState()
  console.log('globalState: ', globalState)
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
  console.log('response: ', response)
  return (
    <View as='section' className='detail-area'>
      <View className='title'>
        <Text subhead>歌单</Text>
      </View>
      <View as='header' className='collection-info'>
        <Figure className='thumbnail'>
          <Image src={currentCollectionInfo.thumbnail} className='bg' />
          <Icon src={heartIcon} className='cover-icon' />
        </Figure>
        <Text title1>{currentCollectionInfo.label}</Text>
        <View className='creator'>
          <Avatar src={currentCollectionInfo.creatorInfo.avatar} className='avatar' />
          <Text subhead className='nickname'>
            {currentCollectionInfo.creatorInfo.nickName}
          </Text>
          <Text footnote className='create-time'>
            {currentCollectionInfo.createTime} 创建
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
        data={currentCollectionMusicList}
        itemKey={(item) => item.songName}
        initSelectedIndex={0} //TODO: 属于App数据的一部分，要由AppStore控制
        renderItem={(itemInfo, index) => (
          <Item>
            <View className='song-index'>
              <Text>{String(index).padStart(2, '0')}</Text>
            </View>
            <Cycle
              className='indicator-like'
              initActiveIndex={itemInfo.isLiked ? 0 : 1}
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
              <Text className='main-name'>{itemInfo.songName}</Text>
              <Text className='sub-name'>{itemInfo.songSubname}</Text>
            </View>
            <View className='author'>
              <Text>{itemInfo.author}</Text>
            </View>
            <View className='album-name'>
              <Text>{itemInfo.albumName}</Text>
            </View>
            <View className='total-seconds'>
              <Text>{duration(itemInfo.totalSeconds * 1000).format('mm:ss')}</Text>
            </View>
            <Group className='song-badges'>{itemInfo.isSQ && <Icon iconfontName='sq' />}</Group>
          </Item>
        )}
        onSelectItem={() => {
          // TODO:store.playNewMusic(itemInfo)
        }}
      />
    </View>
  )
}
