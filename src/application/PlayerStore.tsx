import React, { useEffect, useRef, useReducer, useCallback, useMemo, createContext } from 'react'

import { Button, Icon, Slider, Popover, Image, Text } from 'components/UI'
import { View, Cycle } from 'components/wrappers'
import duration from 'utils/duration'
import useRequest from 'hooks/useRequest'
import requestSongUrl from 'requests/song/url'
import { useTypedSelector, useTypedDispatch } from 'redux/createStore'
import useElement from 'hooks/useElement'
import { clamp } from 'utils/number'
import useFlag from 'hooks/useFlag'
import useDevRenderCounter from 'hooks/useDevRenderCounter'
import { switchState } from 'utils/string'
import requestLike from 'requests/like'
import createCounterTrigger, { CounterTrigger } from 'utils/createCounterTrigger'

export type State = {
  playStatus: 'paused' | 'playing'
  playMode: 'random-mode' | 'infinit-mode' | 'recursive-mode'
  passedMilliseconds: number /* 播放了多少毫秒 */
  volumn: number // 0~1， 默认1，即全音量
  isLike: boolean // 在 “我喜欢” 的列表中
  affectAudioElement: CounterTrigger
}
export const initState: State = {
  playStatus: 'paused',
  playMode: 'random-mode',
  passedMilliseconds: 0,
  volumn: 1,
  isLike: false,
  affectAudioElement: createCounterTrigger()
}

export type Action =
  | { type: 'set playMode'; playMode: State['playMode'] }
  | { type: 'set playStatus'; playStatus: State['playStatus'] }
  | {
      type: 'set passed milliseconds'
      milliseconds: State['passedMilliseconds']
      needAffactAudioElement?: boolean
    }
  | { type: 'play audio' }
  | { type: 'pause audio' }
  | { type: 'toggle audio' }
  | { type: 'reset audio' }
  | { type: 'set audio volumn'; volumn: State['volumn'] }
  | { type: 'increase audio volumn by 5' }
  | { type: 'decrease audio volumn by 5' }
  | { type: 'toggle like the song' }
  | { type: 'like the song'; isInit?: boolean }
  | { type: 'dislike the song'; isInit?: boolean }

export const PlayerContext = createContext<[State, (action: Action) => void]>([initState, () => {}])

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'like the song': {
      // 需要再次请求喜欢音乐列表，但这个逻辑无关乎当前组件，应该把逻辑写在redux里
      // TODO
      const newState = { ...state, isLike: true } as State
      return newState
    }
    case 'dislike the song': {
      // TODO
      const newState = { ...state, isLike: false } as State
      return newState
    }
    case 'toggle like the song': {
      const newState = { ...state, isLike: switchState(state.isLike, [true, false]) } as State
      return newState
    }
    case 'reset audio': {
      const newState = {
        ...state,
        playStatus: 'paused',
        passedMilliseconds: 0,
        affectAudioElement: state.affectAudioElement.trigger()
      } as State
      return newState
    }
    case 'play audio': {
      const newState = { ...state, playStatus: 'playing' } as State
      return newState
    }
    case 'pause audio': {
      const newState = { ...state, playStatus: 'paused' } as State
      return newState
    }
    case 'toggle audio': {
      const newState = {
        ...state,
        playStatus: switchState(state.playStatus, ['playing', 'paused'])
      } as State
      return newState
    }
    case 'set playStatus': {
      const newState = { ...state, playStatus: action.playStatus } as State
      return newState
    }
    case 'set playMode': {
      const newState = { ...state, playMode: action.playMode } as State
      return newState
    }
    case 'set passed milliseconds': {
      const newState = {
        ...state,
        passedMilliseconds: action.milliseconds,
        affectAudioElement: action.needAffactAudioElement
          ? state.affectAudioElement.trigger()
          : state.affectAudioElement
      } as State
      return newState
    }
    case 'set audio volumn': {
      const newState = { ...state, volumn: clamp(action.volumn) } as State
      return newState
    }
    case 'increase audio volumn by 5': {
      const newState = { ...state, volumn: clamp(state.volumn + 0.05) } as State
      return newState
    }
    case 'decrease audio volumn by 5': {
      const newState = { ...state, volumn: clamp(state.volumn - 0.05) } as State
      return newState
    }
    default: {
      return state // 返回相同的引用，没有重渲染
    }
  }
}
export const PlayerStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)
  return <PlayerContext.Provider value={[state, dispatch]}>{children}</PlayerContext.Provider>
}
