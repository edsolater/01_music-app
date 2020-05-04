import React from 'react'

import './Playlist.scss'
import { Menu } from 'components/higher'
import { Icon, Badge, Text, Avatar } from 'components/lower'
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
      {/* TODO - 需要改造这个组件，这个组件不是负责渲染UI的，而是组织更小的UI组件的 */}
      {/* TODO 不妨吧这里的menu看成一个特殊的List，那么为了通用性，是不是应该去除一个？ */}
      <Menu
        data={{
          all:
            responsePlaylist.playlist?.map((item, index) => ({
              ...item,
              label: index.toString(),
            })) ?? [],
        }}
        renderMenuGroup={(groupInfo) => (
          <View className='menu-title'>
            <Text headline>{groupInfo.label}</Text>
            {groupInfo.label === '创建的歌单' && <Icon iconfontName='add' />}
          </View>
        )}
        rendeItem={(itemInfo) => (
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
