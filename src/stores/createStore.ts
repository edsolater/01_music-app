import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { createStore } from 'redux'
import audioPlayerData from 'stores/storeAudioPlayer'
import albumMenuData from 'stores/storeAlbumMenu'
import mainAppContentData from 'stores/storeMainAppContent'
import { rootReducer } from '../reducers/createReducer'
import userProfile from 'stores/storeShared'

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
