import React, { useMemo } from 'react'

import './Playlist.scss'
import { SectionList } from 'components/structure'
import { Icon, Badge, Text, Avatar } from 'components/UI'
import { View, Item, Header } from 'components/wrappers'
import useLocalStorage from 'hooks/useLocalStorage'
import requestUserPlaylist from 'requests/user/playlist'
import useResponse from 'hooks/useResponse'

export default function Playlist() {
  // TODO 需要创造更通用的 useTypedLocalStorage
  const [loginInfo] = useLocalStorage()
  const responsePlaylist = useResponse(requestUserPlaylist, { uid: loginInfo.account.id })
  const parsedPlaylist = useMemo(() => {
    const resultList = [
      { title: '创建的歌单', data: [] as NonNullable<typeof responsePlaylist.playlist> },
      { title: '收藏的歌单', data: [] as NonNullable<typeof responsePlaylist.playlist> },
    ]
    if (responsePlaylist.playlist) {
      for (const list of responsePlaylist.playlist) {
        if (list.userId === loginInfo.account.id) resultList[0].data.push(list)
        else resultList[1].data.push(list)
      }
    }
    return resultList
  }, [responsePlaylist.playlist])
  return (
    <View as='aside' className='album-menu'>
      <View className='shrink-button'>
        <Icon iconfontName='menu' />
      </View>
      <SectionList
        sections={parsedPlaylist}
        renderSectionHeader={({ title }) => (
          <Header>
            <Text headline>{title}</Text>
            {title === '创建的歌单' && <Icon iconfontName='add' />}
          </Header>
        )}
        renderItem={(itemInfo) => (
          <Item>
            <Icon iconfontName={/* itemInfo.icon ??  */ 'music-collection'} />
            <Text>{itemInfo.name}</Text>
          </Item>
        )}
        itemKey={(item) => item.name}
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
