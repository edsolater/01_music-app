import React, { FC, Dispatch } from 'react'
import { render } from 'react-dom'
import { Provider, useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { createStore } from 'redux'

import './assets/iconfont/iconfont.css'
import './App.scss'
import { AlbumMenu, MainAppContent, AudioPlayer } from 'components'
import { userProfileData } from 'global/state'
import audioPlayerData from 'components/AudioPlayer/state'
import albumMenuData from 'components/AlbumMenu/state'
import mainAppContentData from 'components/MainAppContent/state'

/**reducer */
type IAction =
  | { type: 'LOAD_NEW_SONG'; songUrl: string }
  | { type: 'SET_SONG_VOLUMN'; volumNumber: number }
const bigReducer = (state = {}, action: IAction) => {
  switch (action.type) {
    case 'LOAD_NEW_SONG':
      return {}
    default:
      return state
  }
}
export const useTypedDispatch = (): Dispatch<IAction> => useDispatch()

/**store */
const initStore = {
  userProfile: userProfileData,
  menu: albumMenuData,
  playerBar: audioPlayerData,
  collectionInfo: mainAppContentData.collectionInfo,
  collectionMusicList: mainAppContentData.collectionMusicList,
}
const store = createStore(bigReducer, initStore)
export const useTypedSelector: TypedUseSelectorHook<typeof initStore> = useSelector

/**<App> */
const App: FC<{}> = () => (
  <Provider store={store}>
    <AlbumMenu />
    <MainAppContent />
    <AudioPlayer />
  </Provider>
)

render(<App />, document.getElementById('app'))
