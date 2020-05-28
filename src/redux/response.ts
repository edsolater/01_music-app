import { ResponseSongUrl } from 'requests/song/url'

/**********
 *
 * 应用本身的状态
 *
 **********/
export type State = {
  ofSongUrl?: ResponseSongUrl
}

type StateAdaptor<T> = ((oldVlaue: T) => T) | T

export type Action = {
  type: 'SET_RESPONSE_SONG_URL'
  data: StateAdaptor<State['ofSongUrl']>
}

export const reducer = (state: State = {}, action: Action) => {
  switch (action.type) {
    case 'SET_RESPONSE_SONG_URL': {
      const newValue =
        typeof action.data === 'function' ? action.data(state.ofSongUrl) : action.data
      // draft = newValue // TODO 这里的全部设定会需要一个diff
      return { ...state, ofSongUrl: newValue } as State
    }
    default:
      return state
  }
}
