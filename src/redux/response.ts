import { ResponseSongUrl } from 'requests/song/url'
import produce from 'immer'

type StateAdaptor<T> = ((oldVlaue: T | undefined) => T) | T

/**********
 *
 * 应用本身的状态
 *
 **********/
export type State = {
  songUrl: { [id: string]: ResponseSongUrl | undefined }
}

export type Action = {
  type: '[RESPONSE]_CACH_A_SONG_URL'
  songId: ID
  data: StateAdaptor<ResponseSongUrl>
}

export const reducer = produce(
  (draft: State, action: Action) => {
    switch (action.type) {
      case '[RESPONSE]_CACH_A_SONG_URL': {
        const newResponseData =
          typeof action.data === 'function'
            ? action.data(draft.songUrl[action.songId])
            : action.data
        draft.songUrl[action.songId] = newResponseData
      }
    }
  },
  { songUrl: {} }
)
