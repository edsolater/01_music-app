import React, { useEffect } from 'react'
import * as ReactDOM from 'react-dom'

import './App.scss'

import avatar from 'assets/头像.jpg' // 这个信息最终要靠后端传过来，现在只是占位
import avatar2 from 'assets/whiteEye--small.png' // 这个信息最终要靠后端传过来，现在只是占位
import soundtrackUrl from 'assets/ezio Family.mp3' // 这个信息最终要靠后端传过来，现在只是占位
import soundtrackUrl2 from 'assets/Aimer - STAND-ALONE.mp3' // 这个信息最终要靠后端传过来，现在只是占位

import { View, useMaster, Text, Menu } from 'mypack/basic_components'
import AudioPlayer from 'components/AudioPlayer'
import AlbumMenu from 'components/AlbumMenu'
import { spawnCommunicationSystem, ControllerSideType } from './tubeSystem'

const { ControllerSide, ChildSide } = spawnCommunicationSystem()
export const ChildTubeContext = React.createContext(ChildSide)
ChildTubeContext.displayName = 'Tube' // 对Debug友好些

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

const userInfo: UserInfo = {
  avatar,
  nickname: 'edsolater',
}
const menuData: React.ComponentProps<typeof Menu>['data'] = {
  null: [{ title: '搜索' }, { title: '发现音乐' }],
  我的音乐: [
    { title: '本地音乐', selectAction: 'show-local-music' },
    { title: '下载管理' },
    { title: '最近播放' },
  ],
  // '我的音乐-复制': [
  //   { title: '本地音乐', selectAction: 'show-local-music' },
  //   { title: '下载管理' },
  //   { title: '最近播放' },
  // ],
  // '我的音乐-复制2': [
  //   { title: '本地音乐', selectAction: 'show-local-music' },
  //   { title: '下载管理' },
  //   { title: '最近播放' },
  // ],
  // '我的音乐-复制3': [
  //   { title: '本地音乐', selectAction: 'show-local-music' },
  //   { title: '下载管理' },
  //   { title: '最近播放' },
  // ],
  // '我的音乐-复制4': [
  //   { title: '本地音乐', selectAction: 'show-local-music' },
  //   { title: '下载管理' },
  //   { title: '最近播放' },
  // ],
  创建的歌单: [{ title: '我喜欢的音乐' }, { title: '鬼畜' }],
  收藏的歌单: [{ title: '神级燃曲 · 百首顶级日漫激昂配乐' }],
}
// TEMP
function InfoDetail({ songs: data }: { songs: MusicInfo[] }) {
  return (
    <View className='song-details'>
      <Text className='plate-tital'>"song-detail"</Text>
      {/* <Menu
        data={data}
        __MenuItem={(data) => {
          return <View className='songItem'>{data.songTitle}</View>
        }}
      ></Menu> */}
    </View>
  )
}

let tube: ControllerSideType

function App({ initIndex }: { initIndex?: number }) {
  const activeCollectionIndex = useMaster({ type: 'number', init: initIndex })
  //TODO: 这个要能智能提示啊
  const activeSongInfo = useMaster({
    type: 'collection(object)',
    init: {
      songTitle: 'words-Aimer',
      albumUrl: avatar,
      soundtrackUrl: soundtrackUrl,
    },
  })

  useEffect(() => {
    const tubeRecorder = (payload) => {
      switch (payload.type) {
        case 'change-menuItem':
          // 这里需要申明payload的类型信息

          activeCollectionIndex.set(payload.newIndex)
          console.log('hello: ', payload)
          break
        default:
          break
      }
    }
    tube = new ControllerSide('App', tubeRecorder)
  }, [])
  return (
    <View className='app-box'>
      <React.StrictMode>
        <ChildTubeContext.Provider value={ChildSide}>
          <AlbumMenu menuData={menuData} initSelectedIndex={initIndex} userInfo={userInfo} />
          <InfoDetail songs={dataPieces[activeCollectionIndex.getValue()].songs}></InfoDetail>
          <AudioPlayer
            songTitle={activeSongInfo.getTotalObject().songTitle as string} //TODO
            albumUrl={activeSongInfo.getTotalObject().albumUrl as string} //TODO
            soundtrackUrl={activeSongInfo.getTotalObject().soundtrackUrl as string} //TODO
          />
        </ChildTubeContext.Provider>
      </React.StrictMode>
    </View>
  )
}

ReactDOM.render(<App initIndex={0} />, document.getElementById('root'))
