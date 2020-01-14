import React, { ComponentProps } from 'react'
import './AlbumMenu.scss'
import { Menu, Title, Item, Section } from 'mypack/basic_components'
export default function AlbumMenu({
  data,
  initSelectedIndex = 0,
  onSelectNewItem,
  onSelectNewGroup,
}: {
  data: AlbumMenuItem[]
  initSelectedIndex?: number
  onSelectNewItem?: ComponentProps<typeof Menu>['onSelectNewItem']
  onSelectNewGroup?: ComponentProps<typeof Menu>['onSelectNewGroup']
}) {
  return (
    <Section className='album-menu'>
      <Title>song-collection</Title>
      <Menu
        data={menuItemData} //TEMP
        initItemIndex={initSelectedIndex}
        onSelectNewItem={onSelectNewItem}
        onSelectNewGroup={onSelectNewGroup} //TEMP： 两个回调，冗余，应合并成一个
        __MenuGroup={(groupName) => (
          <Title style={{ fontSize: 14, color: 'gray' }} /* TEMP：以后要把样式从逻辑中踢出去 */>
            {groupName}
          </Title>
        )}
        __MenuItem={(menuItem) => (
          <Item>
            <Title>{menuItem.title}</Title>
          </Item>
        )}
      />
    </Section>
  )
}

const menuItemData: MenuGroupData = {
  我的音乐: [
    { title: '本地音乐', action: 'show-local-music' },
    { title: '下载管理' },
    { title: '最近播放' },
  ],
  创建的歌单: [{ title: '我喜欢的音乐' }],
}
