import React from 'react'
import './AlbumMenu.scss'
import { Menu, Title, Image, Item, Section } from 'mypack/basic_components'
export default function AlbumMenu({
  data,
  initSelectedIndex = 0,
  onChangeIndex,
}: {
  data: AlbumMenuItem[]
  initSelectedIndex?: number
  onChangeIndex?: (newIndex: number) => any
}) {
  return (
    <Section className='album-menu'>
      <Title>song-collection</Title>
      <Menu
        data={menuItemData} //TEMP
        initIndex={initSelectedIndex}
        onSelectNewIndex={onChangeIndex}
        __MenuGroup__={(group) => (
          <Title style={{ fontSize: 14, color: 'gray' }}>{group}</Title>
        )}
        __MenuItem__={(item) => (
          <Item
            onClick={() => {
              console.log(`click ${item.title}`)
            }}
          >
            <Title>{item.title}</Title>
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
