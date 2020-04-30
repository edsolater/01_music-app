import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { createStore } from 'redux'
import audioPlayerData from 'components/AudioPlayer/store'
import albumMenuData from 'components/AlbumMenu/store'
import mainAppContentData from 'components/MainAppContent/store'
import { bigReducer } from './reducer'
import userProfile from 'shared/userProfile'

/**store */
const initStore = {
  userProfile: userProfile,
  menu: albumMenuData,
  playerBar: audioPlayerData,
  collectionInfo: mainAppContentData.collectionInfo,
  collectionMusicList: mainAppContentData.collectionMusicList,
}
export const store = createStore(bigReducer, initStore)
export const useTypedSelector: TypedUseSelectorHook<typeof initStore> = useSelector
