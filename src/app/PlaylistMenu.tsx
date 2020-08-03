import React, { useMemo, useContext } from 'react'
import './style.scss'

import { AllResponse } from 'typings/requestPath'
import SectionList from 'baseUI/structure/SectionList'
import View from 'baseUI/UI/View'
import Text from 'baseUI/UI/Text'
import Icon from 'baseUI/UI/Icon'
import Header from 'baseUI/UI/Header'
import Item from 'baseUI/UI/Item'
import Avatar from 'baseUI/UI/Avatar'
import Badge from 'baseUI/UI/Badge'

import { UserInfoContext } from 'context/UserInfo'
import { RouterContext } from 'context/router'
import { useResource } from 'hooks/useFetch'

export default function PlaylistMenu() {
  const [userInfo] = useContext(UserInfoContext)
  const [router, routerDispatch] = useContext(RouterContext)
  const playlists = useResource<AllResponse['/user/playlist']>('/user/playlist', {
    uid: userInfo.account?.id ?? ''
  }).res?.playlist
  const parsedPlaylist = useMemo(() => {
    if (playlists) {
      const resultList = [
        {
          data: [
            // { name: '搜索', isMenu: true, iconName: 'search', id: 0 },
            { name: '发现音乐', isMenu: true, iconName: 'music-note', id: 1 },
            { name: 'MV', isMenu: true, iconName: 'mv', id: 2 }
            // { name: '朋友', isMenu: true, iconName: 'friends', id: 3 }
          ]
        },
        {
          title: '我的音乐',
          data: [
            // { name: '本地音乐', isMenu: true, iconName: 'local-music', id: 4 },
            // { name: '下载管理', isMenu: true, iconName: 'download', id: 5 },
            // { name: '最近播放', isMenu: true, iconName: 'history', id: 6 },
            // { name: '我的音乐云盘', isMenu: true, iconName: 'cloud-disk', id: 7 },
            // { name: '我的电台', isMenu: true, iconName: 'music-station', id: 8 },
            // { name: '我的收藏', isMenu: true, iconName: 'collection-folder', id: 9 }
          ]
        },
        { title: '创建的歌单', data: [] as PlaylistItem[] },
        { title: '收藏的歌单', data: [] as PlaylistItem[] }
      ]
      for (const list of playlists) {
        // @ts-ignore
        if (list.userId === userInfo.account.id) resultList[2].data.push(list)
        // @ts-ignore
        else resultList[3].data.push(list)
      }
      return resultList
    }
  }, [playlists])
  return (
    <aside className='PlaylistMenu'>
      <View className='shrink-button'>
        <Icon iconfontName='menu' />
      </View>
      <SectionList
        sections={parsedPlaylist}
        initSelectedPath={`0/${router.last.id}`}
        renderSectionHeader={({ title }) =>
          title && (
            <Header>
              <Text h4>{title}</Text>
              {title.includes('创建的歌单') && <Icon iconfontName='add' />}
            </Header>
          )
        }
        onSelectItem={item => {
          routerDispatch({
            type: 'to',
            // @ts-expect-error isMenu不是类型中一定存在的，
            item: { name: item.isMenu ? 'menu' : 'playlist', id: item.id }
          })
        }}
        renderItem={itemInfo => (
          <Item className='--clickable'>
            <Icon
              iconfontName={
                itemInfo.name.includes('喜欢的音乐')
                  ? 'heart_empty'
                  : // @ts-expect-error iconName不是类型中一定存在的，所以不同数据类型的最好不要放在一个数组里
                    itemInfo.iconName ?? 'music-collection'
              }
            />
            <Text line>{itemInfo.name}</Text>
          </Item>
        )}
        itemKey={item => item.name}
      />
      <View className='user-info-box'>
        <Avatar src={userInfo.profile?.avatarUrl} />
        <Text className='nickname'>{userInfo.profile?.nickname}</Text>
        <Badge number={32}>
          <Icon iconfontName='mail' />
        </Badge>
        <Icon iconfontName='setting' />
      </View>
    </aside>
  )
}
