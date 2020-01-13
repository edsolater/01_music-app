import React from 'react'
import './AlbumMenu.scss'
import { View, Menu, Label, Image, Text } from 'mypack/basic_components'
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
        ItemsScope={(scope) => (
          <View
            onClick={() => {
              console.log(`click ${scope.title}`)
            }}
          >
            <Image src={scope.imageUrl} />
            <Label className='title'>{scope.title}</Label>
          </View>
        )}
      />
    </View>
  )
}
