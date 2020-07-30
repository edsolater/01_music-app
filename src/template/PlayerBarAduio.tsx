import React, {
  useRef,
  useReducer,
  useContext,
  useEffect,
  AudioHTMLAttributes,
  useMemo
} from 'react'
import './style.scss'

import useDevRenderCounter from 'hooks/useDevRenderCounter'

// 导出给它的子组件使用
type State = {}
const initState: State = {}

export type Action = {
  type: 'do nothing'
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'do nothing': {
      return state
    }
    default: {
      throw new Error(`${PlayerBarAudio.name} 的 localState 无法初始化`)
    }
  }
}

/**
 * 增强版<audio>
 * 一旦设置就脱离react的组件。如要控制，必须使用useEffect
 */
export default function PlayerBarAudio(
  props: AudioHTMLAttributes<any> & {
    /** 0~1 之间 */
    volumn: number
    running?: boolean
    onEverySecond: (currentMillisecond: number) => void

    /**
     * 设置当前进度条的时间，
     * 因为数据会频繁变化，但UI不会频繁变化
     * 故，需配合shouldAffectUi使用
     */
    currentMilliseconds: number
    /**
     * 修改时间是否会影响此UI
     * 配合milliseconds使用
     */
    shouldAffectUi: boolean
  }
) {
  /* ---------------------------------- dev ---------------------------------- */
  useDevRenderCounter(PlayerBarAudio.name)

  /* ----------------------------------- 状态 ----------------------------------- */
  const [state, dispatch] = useReducer(reducer, initState)
  const audioRef = useRef<HTMLAudioElement>(null)

  return useMemo(() => <audio ref={audioRef} {...props} />, [])
}
