import React, { useEffect, useRef } from 'react'

import './PlayerBar.scss'
import { useMethods } from 'components/customHooks'
import { Button, Icon, Slider, Popover, Image, Text } from 'components/UI'
import { View, Cycle } from 'components/wrappers'
import duration from 'utils/duration'
import useRequest from 'hooks/useRequest'
import requestSongUrl from 'requests/song/url'
import { useTypedSelector, useTypedDispatch } from 'redux/createStore'
import useElement from 'hooks/useElement'
import useEffectFlag from 'hooks/useEffectFlag'

type PlayStatus = 'paused' | 'playing'
type PlayMode = 'random-mode' | 'infinit-mode' | 'recursive-mode'
type ComponentState = {
  currentSecond: number
  playMode: PlayMode
  playStatus: PlayStatus
}
type ComponentMethod = {
  play(): void
  pause(): void
  togglePlayState(): void
  togglePlayMode(): void
  setPlayState(newState: PlayStatus): void
  setPlayMode(newMode: PlayMode): void
  changingSecondText(seconds: number): void
}

export default function PlayerBar() {
  const songInfo = useTypedSelector(s => s.cache.songInfo)
  const reduxPlayer = useTypedSelector(s => s.player)
  const dispatch = useTypedDispatch()
  const response = useRequest(requestSongUrl, {
    params: { id: songInfo.id },
    deps: [songInfo.id]
  })
  console.log('response: ', response) // FIXME - 每秒重渲染，这里重渲染了2次，有一次是没有必要的，另一次仔细想来，必要性不大
  const audioElement = useElement('audio', el => {
    el.volume = reduxPlayer.volumn
    el.addEventListener('ended', () => {
      shouldChangeAudio.trigger()
      methods.pause()
      dispatch({
        type: 'SET_PLAYER_PASSED_MILLISECONDS',
        passedMilliseconds: 0
      })
    })
  })

  // TODO 突发奇想：创造useCache，用以代替useCallback与 useMemo在缓存方面的作用

  // 要做拖动滑块，快速改变数值，需要绕过react，所以不得不通过ref直接改变节点了
  const currentSecondSpanRef = useRef<HTMLSpanElement>()
  // 不对，redux是存储结果的仓库，结果间互相干涉的逻辑也在redux，但产主结果的逻辑就放在组件本身，不要给redux的好）
  // TODO - 这里是把数据处理后交给自身的方法，应该也有把数据交给redux的传参方式
  const [state, methods] = useMethods(
    //TODO 我觉得这个 draft 得是store才好。store能获取redux的数据，dispatch能向redux发射值
    draft => {
      const methods: ComponentMethod = {
        play() {
          methods.setPlayState('playing')
        },
        pause() {
          methods.setPlayState('paused')
        },
        togglePlayState() {
          const playStates: PlayStatus[] = ['paused', 'playing']
          methods.setPlayState(
            playStates[
              (playStates.findIndex(currentState => draft.playStatus === currentState) + 1) %
                playStates.length
            ]
          )
        },
        setPlayState(newStatus: PlayStatus) {
          switch (newStatus) {
            case 'playing': {
              audioElement.play()
              draft.playStatus = 'playing'
              return
            }
            case 'paused': {
              audioElement.pause()
              draft.playStatus = 'paused'
              return
            }
          }
        },
        togglePlayMode() {
          const playModes: PlayMode[] = ['infinit-mode', 'recursive-mode', 'random-mode']
          methods.setPlayMode(
            playModes[
              (playModes.findIndex(currentMode => draft.playMode === currentMode) + 1) %
                playModes.length
            ]
          )
        },
        setPlayMode(newMode: PlayMode) {
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
          draft.playMode = newMode
        },
        // 改变当前时间线显示的数字
        changingSecondText(incomeCurrentSecond: number) {
          if (currentSecondSpanRef.current) {
            currentSecondSpanRef.current.textContent = duration(incomeCurrentSecond * 1000).format(
              'mm:ss'
            )
          }
        }
      }
      return methods
    },
    // TODO 利用setters实现，更改这里的值，相当于向redux dispatch
    {
      currentSecond: 0,
      playStatus: 'paused',
      playMode: 'random-mode'
    } as ComponentState
  )

  // 载入新音乐时，就暂停播放，并且指针回到初始位置。
  // 由数据驱动的IO操作这么写，那由事件驱动的呢？
  useEffect(() => {
    methods.pause() //FIXME - 指令式，而且会引起重渲染，不好
    dispatch({
      type: 'SET_PLAYER_PASSED_MILLISECONDS',
      passedMilliseconds: 0
    }) // FIXME 典型错误：在这里发射信息给redux，不是地方
  }, [songInfo])

  /* ---------------------------- webAPI 音乐播放器相关 ---------------------------- */

  const url = String(response.data?.[0].url)
  useEffect(() => {
    audioElement.src = url
  }, [url])
  const shouldChangeAudio = useEffectFlag(() => {
    audioElement.currentTime = reduxPlayer.passedMilliseconds / 1000
  })

  /* -------------------------------- 进度条数值每秒递增 ------------------------------- */

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (state.playStatus === 'playing') {
        dispatch({
          type: 'SET_PLAYER_PASSED_MILLISECONDS',
          passedMilliseconds: n => Math.min(n + 1000, Number(songInfo.dt))
        })
      }
    }, 1000)
    return () => clearTimeout(timeoutId)
  })

  /* -------------------------------------------------------------------------- */
  return (
    <View as='section' className='player-bar'>
      <Image className='album-face' src={songInfo?.al?.picUrl} />
      <View className='music-buttons'>
        <Button className='last-song'>
          <Icon iconfontName='music_pre' />
        </Button>
        <Button className={state.playStatus} onClick={methods.togglePlayState}>
          {state.playStatus === 'playing' ? (
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
        <View className='songTitle'>{songInfo.name}</View>
        <View className='timestamp'>
          <Text ref={currentSecondSpanRef}>
            {duration(reduxPlayer.passedMilliseconds).format('mm:ss')}
          </Text>
          <Text className='divider'> / </Text>
          <Text>
            {duration(songInfo.dt).format('mm:ss')}
            {/* 像这种就是没有改变逻辑，只是改变显示的数据处理，直接写在ReactNode里反而好 */}
          </Text>
        </View>
        <Slider
          value={reduxPlayer.passedMilliseconds / 1000}
          max={Number(songInfo.dt) / 1000}
          onMoveTrigger={methods.changingSecondText}
          //TODO 这里不应该是百分比更合理吗，中间商应该是个比值（比如物理中的速度就是个出色的中间商）
          onMoveTriggerDone={seconds => {
            shouldChangeAudio.trigger()
            dispatch({
              type: 'SET_PLAYER_PASSED_MILLISECONDS',
              passedMilliseconds: seconds * 1000
            })
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
                dispatch({ type: 'SET_PLAYER_VOLUMN', volumn: volumn })
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
