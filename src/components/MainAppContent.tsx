import React from 'react'

import './MainAppContent.scss'
import { heartIcon } from 'assets/icons'
import { formatSeconds } from 'mypack/utils/TimeFormatter'
import { List } from 'mypack/components/higher'
import { Text, Icon, Avatar, Button, Image } from 'mypack/components/lower'
import { View, Figure, Group, Cycle, Item } from 'mypack/components/wrappers'
import { useTypedStoreSelector } from 'store'
export default function MainAppContent() {
  const currentCollectionInfo = useTypedStoreSelector((state) => state.collectionInfo)
  const currentCollectionMusicList = useTypedStoreSelector((state) => state.collectionMusicList)
  return (
    <View as='section' className='main-app-content'>
      <View className='title'>
        <Text subhead>歌单</Text>
      </View>
      <View as='header' className='collection-info'>
        <Figure className='thumbnail'>
          <Image src={currentCollectionInfo.thumbnail} className='bg' />
          <Icon src={heartIcon} className='cover-icon' />
        </Figure>
        <Text title1>{currentCollectionInfo.title}</Text>
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
              <Text>{formatSeconds(itemInfo.totalSeconds)}</Text>
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
