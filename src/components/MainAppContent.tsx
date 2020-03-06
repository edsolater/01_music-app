import React, { useContext } from 'react'
import { Item, Image, Icon, Text, ImageBox, Button, List, Divider, View } from 'mypack/components'
import './MainAppContent.scss'
import { heartIcon } from 'assets/icons'
import { AppDataContext } from 'App'

export default function MainAppContent() {
  const appData = useContext(AppDataContext)
  return (
    <View className='main-app-content'>
      <Text headline>歌单</Text>
      <View className='collection-info'>
        <View className='thumbnail'>
          <ImageBox src={appData.collectionInfo.thumbnail} className='thumbnail-pic' />
          <Icon src={heartIcon} className='thumbnail-icon' />
        </View>
        <Text largeTitle>{appData.collectionInfo.title}</Text>
        <View className='creator'>
          <Image src={appData.collectionInfo.creatorInfo.avatar} className='creator-avatar' />
          <Text subhead className='creator-nickname'>
            {appData.collectionInfo.creatorInfo.nickName}
          </Text>
          <Text footnote className='creator-create-time'>
            {appData.collectionInfo.createTime} 创建
          </Text>
        </View>
        <View className='buttons'>
          <Button>收藏</Button>
          <Button>评论</Button>
          <Button>分享</Button>
          <Button>下载全部</Button>
          <Button>更多</Button>
        </View>
      </View>
      <View className='list-operator'>
        <View className='play-all-btn'>
          <Icon iconfontName='play-all' />
          <Text>全部播放</Text>
        </View>
        <View className='col-line' />
        {/* TODO: icon text 是常见的使用组合，需要提出组件以增强表现力 */}
        <View className='select-btn'>
          <Icon iconfontName='select-panel' />
          <Text>选择</Text>
        </View>
        <View className='search-slot'>
          <View $tag='input' className='input' html={{ placeholder: '搜索歌单歌曲' }} />
          <Icon iconfontName='search' />
        </View>
      </View>
      <List
        data={appData.collectionMusicList}
        keyForListItems={item => item.songName}
        initSelectedIndex={0} //TODO: 属于App数据的一部分，要由AppStore控制
        renderListItem={(itemInfo, index) => (
          <>
            <Text>{String(index).padStart(2, '0')}</Text>
            <view className='icon-box'>
              {itemInfo.isLiked ? (
                <Icon iconfontName='heart' />
              ) : (
                <Icon iconfontName='heart_empty' />
              )}
            </view>
            <Text className='song-name'>
              {itemInfo.songName}
              <Text className='song-sub-name'>{itemInfo.songSubname}</Text>
            </Text>
            <Text className='author'>{itemInfo.author}</Text>
            <Text className='album-name'>{itemInfo.albumName}</Text>
            {/* TODO:需要时间格式化方法 */}
            <Text className='total-seconds'>{itemInfo.totalSeconds}</Text>
            <View className='icon-box'>{itemInfo.isSQ && <Icon iconfontName='sq' />}</View>
          </>
        )}
        onSelectItem={itemInfo => {
          appData.playNewMusic(itemInfo)
        }}
      />
    </View>
  )
}
