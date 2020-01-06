import React from 'react'
import './AsideMenu.scss'
import { View, List, Label, Image, Text } from 'mypack/basic_components'
export default function AsideMenu({
  data,
  initSelectedIndex = 0,
  onChangeIndex,
}: {
  data: CollectionInfo[]
  initSelectedIndex?: number
  onChangeIndex?: (newIndex: number) => any
}) {
  return (
    <View className='collections-list'>
      <Text className='plate-title'>song-collection</Text>
      <List
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
