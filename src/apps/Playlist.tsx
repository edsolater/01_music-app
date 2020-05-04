import React from 'react'

import './Playlist.scss'
import { SectionList } from 'components/structure'
import { Icon, Badge, Text, Avatar } from 'components/UI'
import { View, Item } from 'components/wrappers'
import useLocalStorage from 'hooks/useLocalStorage'
import requestUserPlaylist from 'requests/user/playlist'
import { useResponse } from 'hooks/useResponse'

export default function Playlist() {
  // TODO 需要创造更通用的 useTypedLocalStorage
  const [loginInfo] = useLocalStorage()

  const responsePlaylist = useResponse(requestUserPlaylist, { uid: loginInfo.account.id })

  return (
    <View as='aside' className='album-menu'>
      <View className='shrink-button'>
        <Icon iconfontName='menu' />
      </View>
      <SectionList
        data={
          responsePlaylist.playlist?.map((item, index) => ({
            ...item,
            label: index.toString(),
          })) ?? []
        }
        // renderMenuGroup={(groupInfo) => (
        //   <View className='menu-title'>
        //     <Text headline>{groupInfo.label}</Text>
        //     {groupInfo.label === '创建的歌单' && <Icon iconfontName='add' />}
        //   </View>
        // )}
        renderItem={(itemInfo) => (
          <Item>
            <Icon iconfontName={/* itemInfo.icon ??  */ 'music-collection'} />
            <Text>{itemInfo.name}</Text>
          </Item>
        )}
      />
      <View className='user-info'>
        <Avatar src={'userProfile.avatar'} />
        <Text className='nickname'>{'userProfile.nickname'}</Text>
        <Badge number={32}>
          <Icon iconfontName='mail' />
        </Badge>
        <Icon iconfontName='setting' />
      </View>
    </View>
  )
}
