import React from 'react'
import './AlbumMenu.scss'
import { Menu, Title, Image, Item, Section } from 'mypack/basic_components'
export default function AlbumMenu({
  data,
  initSelectedIndex = 0,
  onChangeIndex,
}: {
  data: CollectionItemInfo[]
  initSelectedIndex?: number
  onChangeIndex?: (newIndex: number) => any
}) {
  return (
    <Section className='album-menu'>
      <Title>song-collection</Title>
      <Menu
        data={data}
        initIndex={initSelectedIndex}
        onSelectNewIndex={onChangeIndex}
        __MenuGroup__={(group: CollectionGroupInfo) => <Title>{group.title}</Title>}
        __MenuItem__={(item: CollectionItemInfo) => (
          <Item
            onClick={() => {
              console.log(`click ${item.title}`)
            }}
          >
            <Image src={item.imageUrl} />
            <Title>{item.title}</Title>
          </Item>
        )}
      />
    </Section>
  )
}
