import React, { ComponentProps } from 'react'
import { Menu, Title, Item, Section, Card } from 'mypack/basic_components'
import './AlbumMenu.scss'

export default function AlbumMenu({
  data,
  initSelectedIndex = 0,
  onSelectMenuItem,
}: {
  data: AlbumMenuItem[]
  initSelectedIndex?: number
  onSelectMenuItem?: ComponentProps<typeof Menu>['onSelectMenuItem']
}) {
  return (
    <Section className='album-menu'>
      <Title>song-collection</Title>
      <Menu
        data={menuItemData} //TEMP
        initItemIndex={initSelectedIndex}
        onSelectMenuItem={onSelectMenuItem}
        __Header_node={
          <Card>
            <Title>Header hear!</Title>
          </Card>
        }
        __MenuGroup_node={({ group: menuGroup }) => (
          <Title style={{ fontSize: 14, color: 'gray' }} /* TEMP：以后要把样式从逻辑中踢出去 */>
            {menuGroup.title}
          </Title>
        )}
        __MenuItems_node={({ item: menuItem }) => (
          <Item>
            <Title>{menuItem.title}</Title>
          </Item>
        )}
        __Footer_node={<Title>I'm Footer</Title>}
      ></Menu>
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
