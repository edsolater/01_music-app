import React from 'react'
import * as ReactDOM from 'react-dom'

import './App.less'

import avatar from 'assets/头像.jpg' // 这个信息最终要靠后端传过来，现在只是占位
import avatar2 from 'assets/whiteEye--small.png' // 这个信息最终要靠后端传过来，现在只是占位
import soundtrackUrl from 'assets/ezio Family.mp3' // 这个信息最终要靠后端传过来，现在只是占位
import soundtrackUrl2 from 'assets/Aimer - STAND-ALONE.mp3' // 这个信息最终要靠后端传过来，现在只是占位

import { TableView, Image, Label, View, useMaster, Text } from 'mypack/basic_components'
import { PlayerBar } from 'components/PlayerBar'
type CollectionInfo = {
  imageUrl: string
  title: string
  subtitle: string
  detail: string
}
type Song = {
  songTitle: string
  albumUrl: string
  soundtrackUrl: string
}
const dataPieces = [
  {
    header: {
      imageUrl: avatar,
      title: 'First title',
      subtitle: 'first subtitle',
      detail: 'hello',
    },
    songs: [
      {
        songTitle: `ezio Family.mp3`,
        albumUrl: avatar,
        soundtrackUrl: soundtrackUrl,
      },
      {
        songTitle: `Aimer - STAND-ALONE.mp3`,
        albumUrl: avatar2,
        soundtrackUrl: soundtrackUrl2,
      },
    ],
  },
  {
    header: {
      imageUrl: avatar2,
      title: 'Secondary title',
      subtitle: 'secondary subtitle',
      detail: 'world',
    },
    songs: [
      {
        songTitle: `Aimer - STAND-ALONE.mp3`,
        albumUrl: avatar2,
        soundtrackUrl: soundtrackUrl2,
      },
    ],
  },
]

function CollectionList({
  data,
  initSelectedIndex = 0,
  onChangeIndex,
}: {
  data: CollectionInfo[]
  initSelectedIndex?: number
  onChangeIndex?: (dataItem: CollectionInfo, index: number, array: CollectionInfo[]) => any
}) {
  return (
    <View slotName='collections-list'>
      <Text className='plate-title'>song-collection</Text>
      <TableView
        data={data}
        initIndex={initSelectedIndex}
        onClickItem={onChangeIndex}
        Slot_Item={(data) => (
          <View
            onClick={() => {
              console.log(`click ${data.title}`)
            }}
          >
            <Image src={data.imageUrl} />
            <Label slotName='title'>{data.title}</Label>
          </View>
        )}
      />
    </View>
  )
}

function SongsList({ songs: data }: { songs: Song[] }) {
  return (
    <View slotName='song-details'>
      <Text className='plate-tital'>"song-detail"</Text>
      <TableView
        data={data}
        Slot_Item={(data) => {
          return <View slotName='songItem'>{data.songTitle}</View>
        }}
      ></TableView>
    </View>
  )
}

function App({ initIndex }: { initIndex?: number }) {
  const activeCollectionIndex = useMaster({ type: 'index-recorder', init: initIndex })
  const activeSongInfo = useMaster({
    type: 'collection(object)',
    init: {
      songTitle: 'words-Aimer',
      albumUrl: avatar,
      soundtrackUrl: soundtrackUrl,
    },
  })
  return (
    <View slotName='app-box'>
      <CollectionList
        data={dataPieces.map((data) => data.header)}
        initSelectedIndex={initIndex}
        onChangeIndex={(_, index) => {
          activeCollectionIndex.set(index)
        }}
      ></CollectionList>
      <SongsList songs={dataPieces[activeCollectionIndex.value].songs}></SongsList>
      <PlayerBar
        songTitle={(activeSongInfo.value as Song).songTitle} //这里源于对typescript的不够熟悉，所以写得很冗余
        albumUrl={(activeSongInfo.value as Song).albumUrl} //这里源于对typescript的不够熟悉，所以写得很冗余
        soundtrackUrl={(activeSongInfo.value as Song).soundtrackUrl} //这里源于对typescript的不够熟悉，所以写得很冗余
      />
    </View>
  )
}

ReactDOM.render(<App initIndex={0} />, document.getElementById('root'))
