import React, { useEffect, ReactElement } from 'react'
import * as ReactDOM from 'react-dom'

import './App.scss'


import { useMaster, Menu, AppRoot } from 'mypack/basic_components'
import AudioPlayer from 'components/AudioPlayer'
import AlbumMenu from 'components/AlbumMenu'
import MainAppContent from 'components/MainAppContent'
import { spawnCommunicationSystem, ControllerSideType } from './tubeSystem'
import { initAppData } from './store'

const { ControllerSide, ChildSide } = spawnCommunicationSystem()
export const ChildTubeContext = React.createContext(ChildSide)
ChildTubeContext.displayName = 'Tube' // 对Debug友好些
export const AppDataContext = React.createContext(initAppData)
AppDataContext.displayName = 'AppData'

let tube: ControllerSideType

function App({ initIndex }: { initIndex?: number }) {
  const activeCollectionIndex = useMaster({ type: 'number', init: initIndex })
  useEffect(() => {
    const tubeRecorder = (payload) => {
      switch (payload.type) {
        case 'change-menuItem':
          // 这里需要申明payload的类型信息

          activeCollectionIndex.set(payload.path)
          console.log('hello: ', payload)
          break
        default:
          break
      }
    }
    tube = new ControllerSide('App', tubeRecorder)
  }, [])
  return (
    <AppRoot>
      <React.StrictMode>
        <AppDataContext.Provider value={initAppData}>
          <ChildTubeContext.Provider value={ChildSide}>
            <AlbumMenu />
            <MainAppContent />
            <AudioPlayer />
          </ChildTubeContext.Provider>
        </AppDataContext.Provider>
      </React.StrictMode>
    </AppRoot>
  )
}

ReactDOM.render(<App initIndex={0} />, document.getElementById('root'))
