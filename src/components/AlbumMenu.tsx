import React from 'react'
import './AlbumMenu.scss'
import { View, Icon, Badge, Text, Avatar } from 'mypack/components/lower'
import { Menu } from 'mypack/components/higher'
import { AppStore } from 'appDataType'

function AlbumMenu(props: { memu: AppStore['menu']; userProfile: AppStore['userProfile'] }) {
  return (
    <View $tag='section' className='album-menu'>
      <View className='shrink-button'>
        <Icon iconfontName='menu' />
      </View>
      <Menu
        data={props.memu.collections} //TEMP
        onSelectMenuItem={() => {
          // console.log('itemInfo: ', itemInfo)
          // console.log('event: ', event)
        }}
        // 这里传递的匿名函数每次重渲染时都会另有函数地址，导致重渲染时性能优化的障碍。但不遇到障碍前，问题不大。
        renderMenuGroup={groupInfo => (
          <View className='menu-title'>
            <Text headline>{groupInfo.label}</Text>
            {groupInfo.label === '创建的歌单' && <Icon iconfontName='add' />}
          </View>
        )}
        renderMenuItem={itemInfo => (
          <>
            <Icon iconfontName={itemInfo.icon ?? 'music-collection'} />
            <View className='textbox'>
              <Badge transparent={!itemInfo.hasSomethingNew}>
                <Text>{itemInfo.title}</Text>
              </Badge>
            </View>
          </>
        )}
      />
      <View className='user-info'>
        <Avatar src={props.userProfile.avatar} />
        <Text className='nickname'>{props.userProfile.nickname}</Text>
        <Badge number={32}>
          <Icon iconfontName='mail' />
        </Badge>
        <Icon iconfontName='setting' />
      </View>
    </View>
  )
}
export default React.memo(AlbumMenu)
