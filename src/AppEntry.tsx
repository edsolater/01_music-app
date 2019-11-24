import React from 'react'
import * as ReactDOM from 'react-dom'

import './AppEntry.css'

import albumUrl from './assets/头像.jpg'
import avatar2 from './assets/whiteEye--small.png'
import soundtrackUrl from './assets/ezio Family.mp3'
import { PlayerBar } from './components/PlayerBar'
import { SongDetails } from './components/SongDetails'
import { SongCollections } from './components/SongCollections'

export declare type AppDatas = {
  imageUrl: string
  title: string
  subtitle: string
  detail: string
}[]
const data: AppDatas = [
  { imageUrl: albumUrl, title: 'First title', subtitle: 'first subtitle', detail: 'hello' },
  { imageUrl: avatar2, title: 'Secondary title', subtitle: 'secondary subtitle', detail: 'world' },
  { imageUrl: avatar2, title: 'Secondary title', subtitle: 'secondary subtitle', detail: 'world' },
  { imageUrl: avatar2, title: 'Secondary title', subtitle: 'secondary subtitle', detail: 'world' },
  { imageUrl: avatar2, title: 'Secondary title', subtitle: 'secondary subtitle', detail: 'world' },
]
const App: React.FC<{}> = (props) => (
  <div className="app-box">
    <SongCollections data={data}></SongCollections>
    <SongDetails></SongDetails>
    <PlayerBar
      {...{
        songTitle: 'words-Aimer',
        albumUrl: albumUrl,
      }}
      soundtrackUrl={soundtrackUrl}
    />
  </div>
)
ReactDOM.render(<App />, document.getElementById('root'))
