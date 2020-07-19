import React, { useRef, useEffect, AudioHTMLAttributes, useMemo } from 'react'
import './style.scss'

import useDevRenderCounter from 'hooks/useDevRenderCounter'

/**
 * 增强版<audio>
 * 一旦设置就脱离react的组件。如要控制，必须使用useEffect
 */
export default function PlayerBarAudio(props: {
  src: SrcUrl
  /** 0~1 之间 */
  volumn: number
  isPlaying?: boolean
  onEverySecond: (currentTime: number) => void
  onCanPlay: AudioHTMLAttributes<any>['onCanPlay']
  onEnded: AudioHTMLAttributes<any>['onEnded']

  /**
   * 设置当前进度条的时间，
   * 因为数据会频繁变化，但UI不会频繁变化
   * 故，需配合affectUi使用
   */
  currentMilliseconds: number
  /**
   * 修改时间是否会影响此UI(如果传入的数组上一次不同，则重渲染)
   * 配合milliseconds使用
   */
  affectUi: number
}): JSX.Element {
  useDevRenderCounter(PlayerBarAudio.name)
  const audioRef = useRef<HTMLAudioElement>(null)

  /**
   * 载入src
   * 因为控制权useMemo，不能再使用状态驱动的方式了（TODO：总感觉不够react）
   */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = props.src
    }
  }, [props.src])

  /**
   * 播放/暂停乐曲
   */
  useEffect(() => {
    if (audioRef.current) {
      if (props.isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [props.isPlaying])

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
  }, [props.affectUi])

  /**
   * 进度条数值每秒递增
   */
  useEffect(() => {
    if (audioRef.current && props.isPlaying) {
      const timeoutId = setInterval(() => {
        if (audioRef.current && props.isPlaying) {
          props.onEverySecond(audioRef.current.currentTime)
        } else {
          clearTimeout(timeoutId)
        }
      }, 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [props.isPlaying])

  return useMemo(
    () => <audio ref={audioRef} onCanPlay={props.onCanPlay} onEnded={props.onEnded} />,
    []
  )
}
