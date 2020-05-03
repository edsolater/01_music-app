import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { createStore } from 'redux'
import audioPlayerData from 'redux/audioPlayer'
import albumMenuData from 'redux/albumMenu'
import mainAppContentData from 'redux/mainAppContent'
import { rootReducer } from './$createReducer'
import userProfile from 'redux/shared'

/**store */
const initStore = {
  userProfile: userProfile,
  menu: albumMenuData,
  playerBar: audioPlayerData,
  collectionInfo: mainAppContentData.collectionInfo,
  collectionMusicList: mainAppContentData.collectionMusicList,
  loginInfo: {
    profile: {} as IProfile,
    account: {} as IAccount,
    token: '',
  },
}
export const store = createStore(rootReducer, initStore)
export const useTypedSelector: TypedUseSelectorHook<typeof initStore> = useSelector
