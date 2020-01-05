import React from 'react'
import './AsideMenu.scss'
import { View, TableView, Label, Image, Text } from 'mypack/basic_components'
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
      <TableView
        data={data}
        initIndex={initSelectedIndex}
        onSelectNewIndex={onChangeIndex}
        ItemsTemplate={(data) => (
          <View
            onClick={() => {
              console.log(`click ${data.title}`)
            }}
          >
            <Image src={data.imageUrl} />
            <Label className='title'>{data.title}</Label>
          </View>
        )}
      />
    </View>
  )
}
