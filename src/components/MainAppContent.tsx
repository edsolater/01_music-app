import React from 'react'

import './MainAppContent.scss'
import { heartIcon } from 'assets/icons'
import { formatSeconds } from 'mypack/utils/TimeFormatter'
import { List } from 'mypack/components/higher'
import { View, Text, Icon, Avatar, Button, Picture } from 'mypack/components/lower'
import { Box, OverlayedImage, Group, LoopBox } from 'mypack/components/wrappers'
import { useTypedStoreSelector } from 'store'

export default function MainAppContent() {
  const currentCollectionInfo = useTypedStoreSelector(state => state.collectionInfo)
  const currentCollectionMusicList = useTypedStoreSelector(state => state.collectionMusicList)
  return (
    <View $tag='section' className='main-app-content'>
      <Text headline>歌单</Text>
      <Box className='collection-info'>
        <OverlayedImage className='thumbnail'>
          <Picture src={currentCollectionInfo.thumbnail} className='bg' />
          <Icon src={heartIcon} className='cover-icon' />
        </OverlayedImage>
        <Text largeTitle>{currentCollectionInfo.title}</Text>
        <Box className='creator'>
          <Avatar src={currentCollectionInfo.creatorInfo.avatar} className='avatar' />
          <Text subhead className='nickname'>
            {currentCollectionInfo.creatorInfo.nickName}
          </Text>
          <Text footnote className='create-time'>
            {currentCollectionInfo.createTime} 创建
          </Text>
        </Box>
        <Group className='buttons'>
          <Button>收藏</Button>
          <Button>评论</Button>
          <Button>分享</Button>
          <Button>下载全部</Button>
          <Button>更多</Button>
        </Group>
      </Box>
      <Group className='list-operator'>
        <Box className='play-all-btn'>
          <Icon iconfontName='play-all' />
          <Text>全部播放</Text>
        </Box>
        <Box className='select-btn'>
          <Icon iconfontName='select-panel' />
          <Text>选择</Text>
        </Box>
        <Box className='search-slot'>
          <Box $tag='input' className='input' html={{ placeholder: '搜索歌单歌曲' }} />
          <Icon iconfontName='search' />
        </Box>
      </Group>
      <List
        data={currentCollectionMusicList}
        keyForListItems={item => item.songName}
        initSelectedIndex={0} //TODO: 属于App数据的一部分，要由AppStore控制
        renderListItem={(itemInfo, index) => (
          <>
            <Box className='song-index'>
              <Text>{String(index).padStart(2, '0')}</Text>
            </Box>
            {/* TODO: 要写一个能自动切换内容的容器 */}
            <LoopBox className='indicator-like' initActiveIndex={itemInfo.isLiked ? 0 : 1}>
              <Icon iconfontName='heart' />
              <Icon iconfontName='heart_empty' />
            </LoopBox>
            <Box className='song-name'>
              <Text className='main-name'>{itemInfo.songName}</Text>
              <Text className='sub-name'>{itemInfo.songSubname}</Text>
            </Box>
            <Box className='author'>
              <Text>{itemInfo.author}</Text>
            </Box>
            <Box className='album-name'>
              <Text>{itemInfo.albumName}</Text>
            </Box>
            <Box className='total-seconds'>
              <Text>{formatSeconds(itemInfo.totalSeconds)}</Text>
            </Box>
            <Group className='song-badges'>{itemInfo.isSQ && <Icon iconfontName='sq' />}</Group>
          </>
        )}
        onSelectItem={() => {
          // TODO:store.playNewMusic(itemInfo)
        }}
      />
    </View>
  )
}
