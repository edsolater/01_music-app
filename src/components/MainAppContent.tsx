import React, { useContext } from 'react'

import './MainAppContent.scss'
import { heartIcon } from 'assets/icons'
import { AppDataContext } from 'App'
import { formatSeconds } from 'mypack/utils/TimeFormatter'
import { View, Text, Image, Icon, Avatar, Button } from 'mypack/components/basicElements'
import { Box, OverlayedImage, Group } from 'mypack/components/layoutWrapper'
import { List } from 'mypack/components/elementAssembly'

export default function MainAppContent() {
  const appData = useContext(AppDataContext)
  return (
    <View $tag='section' className='main-app-content'>
      <Text headline>歌单</Text>
      <Box className='collection-info'>
        <OverlayedImage className='thumbnail'>
          <Image src={appData.collectionInfo.thumbnail} className='bg' />
          <Icon src={heartIcon} className='cover-icon' />
        </OverlayedImage>
        <Text largeTitle>{appData.collectionInfo.title}</Text>
        <Box className='creator'>
          <Avatar src={appData.collectionInfo.creatorInfo.avatar} className='avatar' />
          <Text subhead className='nickname'>
            {appData.collectionInfo.creatorInfo.nickName}
          </Text>
          <Text footnote className='create-time'>
            {appData.collectionInfo.createTime} 创建
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
        <Box className='icon-text-box'>
          <Icon className='default-placeholder' />
          <Text>placeholder-text</Text>
        </Box>
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
        data={appData.collectionMusicList}
        keyForListItems={item => item.songName}
        initSelectedIndex={0} //TODO: 属于App数据的一部分，要由AppStore控制
        renderListItem={(itemInfo, index) => (
          <>
            <Box className='song-index'>
              <Text>{String(index).padStart(2, '0')}</Text>
            </Box>
            <Box className='indicator-like'>
              {/* TODO: 要写一个能自动切换内容的容器 */}
              {itemInfo.isLiked ? (
                <Icon iconfontName='heart' />
              ) : (
                <Icon iconfontName='heart_empty' />
              )}
            </Box>
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
        onSelectItem={itemInfo => {
          appData.playNewMusic(itemInfo)
        }}
      />
    </View>
  )
}
