import React, { useMemo } from 'react'

import './Playlist.scss'
import { SectionList } from 'components/structure'
import { Icon, Badge, Text, Avatar } from 'components/UI'
import { View, Item, Header } from 'components/wrappers'
import requestUserPlaylist from 'requests/user/playlist'
import useResponse from 'hooks/useResponse'
import { useTypedDispatch, useTypedSelector } from 'redux/createStore'

export default function Playlist() {
  const loginInfo = useTypedSelector(s => s.loginInfo)
  console.log('userInfo: ', loginInfo)
  const dispatch = useTypedDispatch()
  const response = useResponse(requestUserPlaylist, { uid: loginInfo.account?.id })
  const parsedPlaylist = useMemo(() => {
    const resultList = [
      {
        data: [
          { name: '搜索', iconName: 'search', id: 0 },
          { name: '发现音乐', iconName: 'music-note', id: 1 },
          { name: 'MV', iconName: 'mv', id: 2 },
          { name: '朋友', iconName: 'friends', id: 3 },
        ],
      },
      {
        title: '我的音乐',
        data: [
          { name: '本地音乐', iconName: 'local-music', id: 4 },
          { name: '下载管理', iconName: 'download', id: 5 },
          { name: '最近播放', iconName: 'history', id: 6 },
          { name: '我的音乐云盘', iconName: 'cloud-disk', id: 7 },
          { name: '我的电台', iconName: 'music-station', id: 8 },
          { name: '我的收藏', iconName: 'collection-folder', id: 9 },
        ],
      },
      { title: '创建的歌单', data: [] as NonNullable<typeof response.playlist> },
      { title: '收藏的歌单', data: [] as NonNullable<typeof response.playlist> },
    ]
    if (response.playlist) {
      for (const list of response.playlist) {
        //@ts-ignore
        if (list.userId === loginInfo.account.id) resultList[2].data.push(list)
        //@ts-ignore
        else resultList[3].data.push(list)
      }
    }
    return resultList
  }, [response.playlist])
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
        renderItem={itemInfo => (
          <Item
            onClick={() => {
              dispatch({ type: 'UPDATE_PLAYLIST_ID', playlistId: itemInfo.id })
            }}
          >
            {itemInfo.name.includes('喜欢的音乐') ? (
              <>
                <Icon iconfontName='heart_empty' />
                <Text>我喜欢的音乐</Text>
              </>
            ) : (
              <>
                <Icon
                  iconfontName={
                    (itemInfo as any) /* iconName 不是类型中一定存在的，所以用any规避问题 */
                      .iconName ?? 'music-collection'
                  }
                />
                <Text>{itemInfo.name}</Text>
              </>
            )}
          </Item>
        )}
        itemKey={item => item.name}
      />
      <View className='user-info'>
        <Avatar src={loginInfo.profile?.avatarUrl} />
        <Text className='nickname'>{loginInfo.profile?.nickname}</Text>
        <Badge number={32}>
          <Icon iconfontName='mail' />
        </Badge>
        <Icon iconfontName='setting' />
      </View>
    </View>
  )
}
