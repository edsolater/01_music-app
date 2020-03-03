import React, { useContext } from 'react'
import { Menu, Item, Card, Avatar, Text, RedDot, View, Icon } from 'mypack/components'
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
          <Item className='menu-item' /* html={{ title: 'hello' }} */>
            <Icon iconfontName={itemInfo.icon ?? 'music-collection'} />
            <View className='textbox'>
              {itemInfo.hasSomethingNew && <RedDot justDot />}
              <Text>{itemInfo.title}</Text>
            </View>
          </Item>
        )}
      />
      <Card className='user-info'>
        <Avatar src={appData.userProfile.avatar} />
        <Text className='nickname'>{appData.userProfile.nickname}</Text>
        <Icon iconfontName='mail'>
          <RedDot amount={32} />
        </Icon>
        <Icon iconfontName='setting' />
      </Card>
    </View>
  )
}
