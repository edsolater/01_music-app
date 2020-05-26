import React, { useEffect, useRef, useReducer } from 'react'

import './PlayerBar.scss'
import { Button, Icon, Slider, Popover, Image, Text } from 'components/UI'
import { View, Cycle } from 'components/wrappers'
import duration from 'utils/duration'
import useRequest from 'hooks/useRequest'
import requestSongUrl from 'requests/song/url'
import { useTypedSelector, useTypedDispatch, CombinedAction } from 'redux/createStore'
import useElement from 'hooks/useElement'

type LocalState = {
  playStatus: 'paused' | 'playing'
  playMode: 'random-mode' | 'infinit-mode' | 'recursive-mode'
  passedMilliseconds: number
}
type LocalAction =
  | { type: 'set playMode'; playMode: LocalState['playMode'] }
  | { type: 'set playStatus'; playStatus: LocalState['playStatus'] }
  | { type: 'play' }
  | { type: 'pause' }
  | { type: 'toggle' }
  | { type: 'reset' }
  | { type: 'set passed milliseconds'; milliseconds: LocalState['passedMilliseconds'] }

export default function PlayerBar() {
  const reduxSongInfo = useTypedSelector(s => s.cache.songInfo)
  const reduxPlayer = useTypedSelector(s => s.player)
  const reduxDispatch = useTypedDispatch()
  const response = useRequest(requestSongUrl, {
    params: { id: reduxSongInfo.id },
    deps: [reduxSongInfo.id]
  })
  //TODO - 需要一个记录渲染次数的hooks，顺便利用它实现强行重渲染。

  const audioElement = useElement('audio', el => {
    el.volume = reduxPlayer.volumn
    el.addEventListener('ended', () => dispatch({ type: 'reset' }))
  })

  const currentSecondSpanRef = useRef<HTMLSpanElement>()
  // TODO 感觉这里回调的逻辑跟useReducer的作用重叠了，会语义不清晰的。得放到useReducer里
  const methods = {
    togglePlayMode() {
      const playModes: LocalState['playMode'][] = ['infinit-mode', 'recursive-mode', 'random-mode']
      methods.setPlayMode(
        playModes[
          (playModes.findIndex(currentMode => localState.playMode === currentMode) + 1) %
            playModes.length
        ]
      )
    },
    setPlayMode(newMode: LocalState['playMode']) {
      switch (newMode) {
        case 'random-mode':
          audioElement.loop = false
          break
        case 'infinit-mode':
          audioElement.loop = true
          break
        case 'recursive-mode':
          audioElement.loop = false
          break
      }
      dispatch({ type: 'set playMode', playMode: newMode })
    },
    // 改变当前时间线显示的数字
    changingSecondText(incomeCurrentSecond: number) {
      if (currentSecondSpanRef.current) {
        currentSecondSpanRef.current.textContent = duration(incomeCurrentSecond * 1000).format(
          'mm:ss'
        )
      }
    },
    setPassedMillseconds(passedMilliseconds: number, options?: { affectAudioElemenet: boolean }) {
      if (options?.affectAudioElemenet) {
        audioElement.currentTime = passedMilliseconds / 1000
      }
      reduxDispatch({
        type: 'SET_PLAYER_PASSED_MILLISECONDS',
        passedMilliseconds: passedMilliseconds
      })
    }
  }
  const [localState, dispatch] = useReducer(
    (state: LocalState, action: LocalAction | CombinedAction) => {
      switch (action.type) {
        case 'reset':
          return { ...state, playStatus: 'paused', passedMilliseconds: 0 } as LocalState
        case 'play':
          return { ...state, playStatus: 'playing' } as LocalState
        case 'pause':
          return { ...state, playStatus: 'paused' } as LocalState
        case 'toggle':
          return {
            ...state,
            playStatus: state.playStatus === 'paused' ? 'playing' : 'paused'
          } as LocalState
        case 'set playStatus':
          return { ...state, playStatus: action.playStatus } as LocalState
        case 'set playMode':
          return { ...state, playMode: action.playMode } as LocalState
        case 'set passed milliseconds':
          return { ...state, passedMilliseconds: action.milliseconds } as LocalState
        default:
          reduxDispatch(action)
          return state // 返回相同的引用，没有重渲染
      }
    },
    { playStatus: 'paused', playMode: 'random-mode', passedMilliseconds: 0 }
  )

  // 载入新音乐时，就暂停播放，并且指针回到初始位置。
  useEffect(() => {
    dispatch({ type: 'reset' })
  }, [reduxSongInfo])

  /* ---------------------------- webAPI 音乐播放器相关 ---------------------------- */

  const url = String(response.data?.[0].url)
  useEffect(() => {
    audioElement.src = url
  }, [url])

  useEffect(() => {
    if (localState.playStatus === 'playing') {
      audioElement.play()
    }
  })
  useEffect(() => {
    if (localState.playStatus === 'paused') {
      audioElement.pause()
    }
  })
  useEffect(() => {
    // if (localState.playStatus === 'paused') {
    // FIXME : 比较特殊：状态改变用不着驱动AudioElement，因此需要一个条件判断
    audioElement.currentTime = localState.passedMilliseconds / 1000
    // }
  }, [localState.passedMilliseconds])
  // TODO - 异想天开： useFlag在读取过一次值之后就转变（成false）

  /* -------------------------------- 进度条数值每秒递增 ------------------------------- */

  useEffect(() => {
    if (localState.playStatus === 'playing') {
      const timeoutId = window.setTimeout(() => {
        if (localState.playStatus === 'playing') {
          dispatch({
            type: 'set passed milliseconds',
            milliseconds: Math.min(localState.passedMilliseconds + 1000, Number(reduxSongInfo.dt))
          })
        }
      }, 1000)
      return () => clearTimeout(timeoutId)
    }
  })

  /* -------------------------------------------------------------------------- */
  return (
    <View as='section' className='player-bar'>
      <Image className='album-face' src={reduxSongInfo?.al?.picUrl} />
      <View className='music-buttons'>
        <Button className='last-song'>
          <Icon iconfontName='music_pre' />
        </Button>
        <Button className={localState.playStatus} onClick={() => dispatch({ type: 'toggle' })}>
          {localState.playStatus === 'playing' ? (
            <Icon iconfontName='pause' />
          ) : (
            <Icon iconfontName='play' />
          )}
        </Button>
        <Button className='next-song'>
          <Icon iconfontName='music_next' />
        </Button>
      </View>
      <View className='timeSlider'>
        <View className='songTitle'>{reduxSongInfo.name}</View>
        <View className='timestamp'>
          <Text ref={currentSecondSpanRef}>
            {duration(localState.passedMilliseconds).format('mm:ss')}
          </Text>
          <Text className='divider'> / </Text>
          <Text>
            {duration(reduxSongInfo.dt).format('mm:ss')}
            {/* 像这种就是没有改变逻辑，只是改变显示的数据处理，直接写在ReactNode里反而好 */}
          </Text>
        </View>
        <Slider
          value={localState.passedMilliseconds / 1000}
          max={Number(reduxSongInfo.dt) / 1000}
          onMoveTrigger={methods.changingSecondText}
          //TODO 这里不应该是百分比更合理吗，中间商应该是个比值（比如物理中的速度就是个出色的中间商）
          onMoveTriggerDone={seconds => {
            methods.setPassedMillseconds(seconds * 1000, { affectAudioElemenet: true })
          }}
        />
      </View>
      <View className='info-panel'>
        <Button className='favorite'>
          <Icon iconfontName='heart_empty' />
        </Button>
        <Cycle
          className='indicator-like'
          initActiveName='random-mode'
          itemList={[
            {
              node: <Icon iconfontName='random-mode' />,
              activeName: 'random-mode',
              onActive: () => methods.setPlayMode('random-mode')
            },
            {
              node: <Icon iconfontName='infinit-mode' />,
              activeName: 'infinit-mode',
              onActive: () => methods.setPlayMode('infinit-mode')
            },
            {
              node: <Icon iconfontName='recursive-mode' />,
              activeName: 'recursive-mode',
              onActive: () => methods.setPlayMode('recursive-mode')
            }
          ]}
        />
        <Popover
          renderPopContent={
            <Slider
              defaultValue={reduxPlayer.volumn}
              onMoveTriggerDone={volumn => {
                reduxDispatch({ type: 'SET_PLAYER_VOLUMN', volumn: volumn })
                audioElement.volume = volumn
              }}
            />
          }
        >
          <Button className='volume'>
            <Icon iconfontName='volumn_empty' />
          </Button>
        </Popover>
        <Button className='playlist' onClick={() => console.log(`I'm clicked d`)}>
          <Icon iconfontName='music-list' />
        </Button>
      </View>
    </View>
  )
}
