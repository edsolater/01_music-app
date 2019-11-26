import React, { useCallback, useState } from 'react'
import * as ReactDOM from 'react-dom'

import './AppEntry.css'

import avatar from './assets/头像.jpg' // 这个信息应该靠后端传过来，现在只是占位
import avatar2 from './assets/whiteEye--small.png' // 这个信息应该靠后端传过来，现在只是占位
import soundtrackUrl from './assets/ezio Family.mp3' // 这个信息应该靠后端传过来，现在只是占位
import soundtrackUrl2 from './assets/Aimer - STAND-ALONE.mp3' // 这个信息应该靠后端传过来，现在只是占位
import { PlayerBar } from './components/PlayerBar'
import { SongsList } from './components/SongsList'
import { CollectionHeader } from './components/CollectionHeader'
import { useUIState } from 'mypack/components/__customHooks'

export declare type Header = {
  imageUrl: string
  title: string
  subtitle: string
  detail: string
}
export declare type Song = {
  songTitle: string
  albumUrl: string
  soundtrackUrl: string
}
type AppDatas = {
  header: Header
  songs: Song[]
}[]
const dataPieces: AppDatas = [
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

function App({ initIndex }: { initIndex?: number }) {
  const activeCollectionIndex = useUIState({ type: 'index-recorder', init: initIndex })
  const activeSongInfo = useUIState({
    type: 'collection(object)',
    init: {
      songTitle: 'words-Aimer',
      albumUrl: avatar,
      soundtrackUrl: soundtrackUrl,
    },
  })
  return (
    <div className="app-box">
      <CollectionHeader
        data={dataPieces.map((data) => data.header)}
        initIndex={initIndex}
        changeIndex={(_, index) => {
          activeCollectionIndex.set(index)
        }}
      ></CollectionHeader>
      <SongsList songs={dataPieces[activeCollectionIndex.value].songs}></SongsList>
      <PlayerBar
        songTitle={(activeSongInfo.value as Song).songTitle} //这里源于对typescript的不够熟悉，所以写得很冗余
        albumUrl={(activeSongInfo.value as Song).albumUrl} //这里源于对typescript的不够熟悉，所以写得很冗余
        soundtrackUrl={(activeSongInfo.value as Song).soundtrackUrl} //这里源于对typescript的不够熟悉，所以写得很冗余
      />
    </div>
  )
}

ReactDOM.render(<App initIndex={0} />, document.getElementById('root'))
