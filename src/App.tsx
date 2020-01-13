import React from 'react'
import * as ReactDOM from 'react-dom'

import './App.scss'

import avatar from 'assets/头像.jpg' // 这个信息最终要靠后端传过来，现在只是占位
import avatar2 from 'assets/whiteEye--small.png' // 这个信息最终要靠后端传过来，现在只是占位
import soundtrackUrl from 'assets/ezio Family.mp3' // 这个信息最终要靠后端传过来，现在只是占位
import soundtrackUrl2 from 'assets/Aimer - STAND-ALONE.mp3' // 这个信息最终要靠后端传过来，现在只是占位

import { Menu, View, useMaster, Text } from 'mypack/basic_components'
import AudioPlayer from 'components/AudioPlayer'
import AlbumMenu from 'components/AlbumMenu'
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
const menuItemData: { [groupName: string]: AlbumMenuItem[] } = {
  我的音乐: [{ title: '本地音乐' }, { title: '下载管理' }, { title: '最近播放' }],
  创建的歌单: [{ title: '我喜欢的音乐' }],
}
const menuItemActions: { [itemTitle: string]: ActionType } = {
  本地音乐: 'show-downloaded-music',
}

// TEMP
function InfoDetail({ songs: data }: { songs: MusicInfo[] }) {
  return (
    <View className='song-details'>
      <Text className='plate-tital'>"song-detail"</Text>
      <Menu
        data={data}
        __MenuItem__={(data) => {
          return <View className='songItem'>{data.songTitle}</View>
        }}
      ></Menu>
    </View>
  )
}

function App({ initIndex }: { initIndex?: number }) {
  const activeCollectionIndex = useMaster({ type: 'number', init: initIndex })
  const activeSongInfo = useMaster({
    type: 'collection(object)',
    init: {
      songTitle: 'words-Aimer',
      albumUrl: avatar,
      soundtrackUrl: soundtrackUrl,
    },
  })
  return (
    <>
      <View className='app-box'>
        <AlbumMenu
          data={dataPieces.map((data) => data.header)}
          initSelectedIndex={initIndex}
          onChangeIndex={(newIndex) => {
            activeCollectionIndex.set(newIndex)
          }}
        ></AlbumMenu>
        <InfoDetail songs={dataPieces[activeCollectionIndex.value].songs}></InfoDetail>
        <AudioPlayer
          songTitle={(activeSongInfo.value as MusicInfo).songTitle} //这里源于对typescript的不够熟悉，所以写得很冗余
          albumUrl={(activeSongInfo.value as MusicInfo).albumUrl} //这里源于对typescript的不够熟悉，所以写得很冗余
          soundtrackUrl={(activeSongInfo.value as MusicInfo).soundtrackUrl} //这里源于对typescript的不够熟悉，所以写得很冗余
        />
      </View>
    </>
  )
}

ReactDOM.render(<App initIndex={0} />, document.getElementById('root'))
