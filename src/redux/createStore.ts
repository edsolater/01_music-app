import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { createStore } from 'redux'
import audioPlayerData from 'redux/storeAudioPlayer'
import albumMenuData from 'redux/storeAlbumMenu'
import mainAppContentData from 'redux/storeMainAppContent'
import { rootReducer } from './createReducer'
import userProfile from 'redux/storeShared'

/**store */
const initStore = {
  userProfile: userProfile,
  menu: albumMenuData,
  playerBar: audioPlayerData,
  collectionInfo: mainAppContentData.collectionInfo,
  collectionMusicList: mainAppContentData.collectionMusicList,
}
export const store = createStore(rootReducer, initStore)
export const useTypedSelector: TypedUseSelectorHook<typeof initStore> = useSelector
