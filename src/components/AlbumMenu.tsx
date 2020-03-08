import React, { useContext } from 'react'
import './AlbumMenu.scss'
import { AppDataContext } from 'App'
import { View, Icon, Badge, Text, Image, Avatar } from 'mypack/components/basicElements'
import { Menu } from 'mypack/components/elementAssembly'

export default function AlbumMenu() {
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
              <Badge hidden={!itemInfo.hasSomethingNew}>
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
