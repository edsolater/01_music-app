import React from 'react'

import './index.scss'
import { Menu } from 'mypack/components/higher'
import { Icon, Badge, Text, Avatar } from 'mypack/components/lower'
import { View, Item } from 'mypack/components/wrappers'
import { useTypedSelector } from 'App'

export default function AlbumMenu() {
  const menu = useTypedSelector((state) => state.menu)
  const userProfile = useTypedSelector((state) => state.userProfile)
  return (
    <View as='aside' className='album-menu'>
      <View className='shrink-button'>
        <Icon iconfontName='menu' />
      </View>
      <Menu
        data={menu.collections}
        onSelectItem={() => {
          // console.log('itemInfo: ', itemInfo)
          // console.log('event: ', event)
        }}
        renderMenuGroup={(groupInfo) => (
          <View className='menu-title'>
            <Text headline>{groupInfo.label}</Text>
            {groupInfo.label === '创建的歌单' && <Icon iconfontName='add' />}
          </View>
        )}
        rendeItem={(itemInfo) => (
          <Item>
            <Icon iconfontName={itemInfo.icon ?? 'music-collection'} />
            <View className='textbox'>
              <Badge transparent={!itemInfo.hasSomethingNew}>
                <Text>{itemInfo.label}</Text>
              </Badge>
            </View>
          </Item>
        )}
      />
      <View className='user-info'>
        <Avatar src={userProfile.avatar} />
        <Text className='nickname'>{userProfile.nickname}</Text>
        <Badge number={32}>
          <Icon iconfontName='mail' />
        </Badge>
        <Icon iconfontName='setting' />
      </View>
    </View>
  )
}
