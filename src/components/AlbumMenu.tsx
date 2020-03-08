import React, { useContext } from 'react'
import './AlbumMenu.scss'
import { AppDataContext } from 'App'
import { View, Icon, Badge, Text, Avatar } from 'mypack/components/lower'
import { Menu } from 'mypack/components/higher'

export default function AlbumMenu() {
  //TODO:总是会刷新此组件及其子组件，是不是用context传递数据反而不合适？
  const appData = useContext(AppDataContext)
  return (
    <View $tag='section' className='album-menu'>
      <View className='shrink-button'>
        <Icon iconfontName='menu' />
      </View>
      <Menu
        data={appData.menu.collections} //TEMP
        onSelectMenuItem={(itemInfo, event) => {
          // console.log('itemInfo: ', itemInfo)
          // console.log('event: ', event)
        }}
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
        <Avatar src={appData.userProfile.avatar} />
        <Text className='nickname'>{appData.userProfile.nickname}</Text>
        <Badge number={32}>
          <Icon iconfontName='mail' />
        </Badge>
        <Icon iconfontName='setting' />
      </View>
    </View>
  )
}
