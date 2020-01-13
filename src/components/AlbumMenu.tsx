import React from 'react'
import './AlbumMenu.scss'
import { View, Menu, Title, Image, Text, Item } from 'mypack/basic_components'
export default function AlbumMenu({
  data,
  initSelectedIndex = 0,
  onChangeIndex,
}: {
  data: CollectionInfo[]
  initSelectedIndex?: number
  onChangeIndex?: (newIndex: number) => any
}) {
  return (
    <View className='album-menu'>
      <Text className='plate-title'>song-collection</Text>
      <Menu
        data={data}
        initIndex={initSelectedIndex}
        onSelectNewIndex={onChangeIndex}
        __MenuItem__={(dataItem) => (
          <Item
            onClick={() => {
              console.log(`click ${dataItem.title}`)
            }}
          >
            <Image src={dataItem.imageUrl} />
            <Title>{dataItem.title}</Title>
          </Item>
        )}
      />
    </View>
  )
}
