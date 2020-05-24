import React, { useEffect, useRef, useReducer } from 'react'

import './PlayerBar.scss'
import { Button, Icon, Slider, Popover, Image, Text } from 'components/UI'
import { View, Cycle } from 'components/wrappers'
import duration from 'utils/duration'
import useRequest from 'hooks/useRequest'
import requestSongUrl from 'requests/song/url'
import { useTypedSelector, useTypedDispatch } from 'redux/createStore'
import useElement from 'hooks/useElement'

type LocalState = {
  playStatus: 'paused' | 'playing'
  playMode: 'random-mode' | 'infinit-mode' | 'recursive-mode'
}
type LocalAction =
  | { type: 'set playMode'; playMode: LocalState['playMode'] }
  | { type: 'set playStatus'; playStatus: LocalState['playStatus'] }

export default function PlayerBar() {
  const [localState, localDispatch] = useReducer(
    (state: LocalState, action: LocalAction) => {
      switch (action.type) {
        case 'set playMode': {
          return { ...state, playMode: action.playMode }
        }
        case 'set playStatus': {
          return { ...state, playStatus: action.playStatus }
        }
        default: {
          throw new Error(`unknow local dispatch in ${PlayerBar.name}`)
        }
      }
    },
    {
      playStatus: 'paused',
      playMode: 'random-mode'
    }
  )
  const reduxSongInfo = useTypedSelector(s => s.cache.songInfo)
  const reduxPlayer = useTypedSelector(s => s.player)
  const reduxDispatch = useTypedDispatch()
  const response = useRequest(requestSongUrl, {
    params: { id: reduxSongInfo.id },
    deps: [reduxSongInfo.id]
  })
  //TODO - 需要一个记录渲染次数的hooks，顺便利用它实现强行重渲染。
  console.log('重渲染次数: ', 1) // FIXME - 每秒重渲染，这里重渲染了4次，有3次是没有必要的。（推测多1倍是因为useMethod中的方法即使返回void，也会导致重渲染）

  const audioElement = useElement('audio', el => {
    el.volume = reduxPlayer.volumn
    el.addEventListener('ended', () => methods.resetPlayer())
  })

  const currentSecondSpanRef = useRef<HTMLSpanElement>()
  const methods = {
    resetPlayer() {
      methods.pause()
      methods.setPassedMillseconds(0, { affectAudioElemenet: true })
    },
    play() {
      methods.setPlayState('playing')
    },
    pause() {
      methods.setPlayState('paused')
    },
    togglePlayState() {
      const playStates: LocalState['playStatus'][] = ['paused', 'playing']
      methods.setPlayState(
        playStates[
          (playStates.findIndex(currentState => localState.playStatus === currentState) + 1) %
            playStates.length
        ]
      )
    },
    setPlayState(newStatus: LocalState['playStatus']) {
      switch (newStatus) {
        case 'playing':
          // TODO 虽然是play了，但数据的改变应该在播放的乐曲加载完成之后
          audioElement.play()
          break
        case 'paused':
          audioElement.pause()
          break
      }
      localDispatch({ type: 'set playStatus', playStatus: newStatus })
    },
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
      localDispatch({ type: 'set playMode', playMode: newMode })
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

  // 载入新音乐时，就暂停播放，并且指针回到初始位置。
  useEffect(() => {
    methods.resetPlayer()
  }, [reduxSongInfo])

  /* ---------------------------- webAPI 音乐播放器相关 ---------------------------- */

  const url = String(response.data?.[0].url)
  useEffect(() => {
    audioElement.src = url
  }, [url])

  /* -------------------------------- 进度条数值每秒递增 ------------------------------- */

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (localState.playStatus === 'playing') {
        methods.setPassedMillseconds(
          Math.min(reduxPlayer.passedMilliseconds + 1000, Number(reduxSongInfo.dt))
        )
      }
    }, 1000)
    return () => clearTimeout(timeoutId)
  })

  /* -------------------------------------------------------------------------- */
  return (
    <View as='section' className='player-bar'>
      <Image className='album-face' src={reduxSongInfo?.al?.picUrl} />
      <View className='music-buttons'>
        <Button className='last-song'>
          <Icon iconfontName='music_pre' />
        </Button>
        <Button className={localState.playStatus} onClick={methods.togglePlayState}>
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
            {duration(reduxPlayer.passedMilliseconds).format('mm:ss')}
          </Text>
          <Text className='divider'> / </Text>
          <Text>
            {duration(reduxSongInfo.dt).format('mm:ss')}
            {/* 像这种就是没有改变逻辑，只是改变显示的数据处理，直接写在ReactNode里反而好 */}
          </Text>
        </View>
        <Slider
          value={reduxPlayer.passedMilliseconds / 1000}
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
