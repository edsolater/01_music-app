import React, { useMemo } from 'react'

import './Playlist.scss'
import { SectionList } from 'components/structure'
import { Icon, Badge, Text, Avatar } from 'components/UI'
import { View, Item, Header } from 'components/wrappers'
import requestUserPlaylist from 'requests/user/playlist'
import useResponse from 'hooks/useResponse'
import { useUserInfo } from 'App'

export default function Playlist() {
  // TODO 需要创造更通用的 useTypedLocalStorage
  const userInfo = useUserInfo()
  const responsePlaylist = useResponse(requestUserPlaylist, { uid: userInfo.account.id })
  const parsedPlaylist = useMemo(() => {
    const resultList = [
      {
        data: [
          { name: '搜索', iconName: 'search' },
          { name: '发现音乐', iconName: 'music-note' },
          { name: 'MV', iconName: 'mv' },
          { name: '朋友', iconName: 'friends' },
        ],
      },
      {
        title: '我的音乐',
        data: [
          { name: '本地音乐', iconName: 'local-music' },
          { name: '下载管理', iconName: 'download' },
          { name: '最近播放', iconName: 'history' },
          { name: '我的音乐云盘', iconName: 'cloud-disk' },
          { name: '我的电台', iconName: 'music-station' },
          { name: '我的收藏', iconName: 'collection-folder' },
        ],
      },
      { title: '创建的歌单', data: [] as NonNullable<typeof responsePlaylist.playlist> },
      { title: '收藏的歌单', data: [] as NonNullable<typeof responsePlaylist.playlist> },
    ]
    if (responsePlaylist.playlist) {
      for (const list of responsePlaylist.playlist) {
        //@ts-ignore
        if (list.userId === userInfo.account.id) resultList[2].data.push(list)
        //@ts-ignore
        else resultList[3].data.push(list)
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
        renderSectionHeader={({ title }) =>
          title && (
            <Header>
              <Text headline>{title}</Text>
              {title.includes('创建的歌单') && <Icon iconfontName='add' />}
            </Header>
          )
        }
        renderItem={(itemInfo) =>
          itemInfo.name.includes('喜欢的音乐') ? (
            <Item>
              <Icon iconfontName='heart_empty' />
              <Text>我喜欢的音乐</Text>
            </Item>
          ) : (
            <Item>
              <Icon
                iconfontName={
                  (itemInfo as any) /* iconName 不是类型中一定存在的，所以用any规避问题 */
                    .iconName ?? 'music-collection'
                }
              />
              <Text>{itemInfo.name}</Text>
            </Item>
          )
        }
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
