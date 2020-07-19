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

  //#region ------------------- 音乐播放器相关指令代码 -------------------

  /**
   * 播放/暂停乐曲
   */
  useEffect(() => {
    if (audioRef.current) {
      if (props.running) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [props.running])

  /**
   * 设定音乐音量
   */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = props.volumn
    }
  }, [props.volumn])

  /**
   * 设定音乐的播放进度
   */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = props.currentMilliseconds / 1000
    }
  }, [props.shouldAffectUi])

  /**
   * 进度条数值每秒递增
   */
  useEffect(() => {
    if (audioRef.current && props.running) {
      const timeoutId = window.setTimeout(() => {
        if (audioRef.current && props.running) {
          props.onEverySecond(audioRef.current.currentTime)
        }
      }, 1000)
      return () => clearTimeout(timeoutId)
    }
  })
  //#endregion
  return useMemo(() => <audio ref={audioRef} {...props} />, [])
}
