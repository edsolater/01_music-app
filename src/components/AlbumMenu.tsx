import React, { useContext } from 'react'
import { Menu, Item, Avatar, Text, Badge, View, Icon } from 'mypack/components'
import './AlbumMenu.scss'
import { AppDataContext } from 'App'

export default function AlbumMenu() {
  const appData = useContext(AppDataContext)
  return (
    <View className='album-menu'>
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
          <Item className='menu-item'>
            <Icon iconfontName={itemInfo.icon ?? 'music-collection'} />
            <View className='textbox'>
              <Badge hidden={!itemInfo.hasSomethingNew}>
                <Text>{itemInfo.title}</Text>
              </Badge>
            </View>
          </Item>
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
