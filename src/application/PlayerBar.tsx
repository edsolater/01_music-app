import React, { useEffect, useRef } from 'react'

import './PlayerBar.scss'
import { useElement, useMethods } from 'components/customHooks'
import { Button, Icon, Slider, Popover, Image, Text } from 'components/UI'
import { View, Cycle } from 'components/wrappers'
import duration from 'utils/duration'
import soundtrackUrl from 'assets/ezio Family.mp3' // 这个信息最终要靠后端传过来，现在只是占位
import { getUserInfo, useGlobalState } from 'App'
import useResponse from 'hooks/useResponse'
import requestUserPlaylist from 'requests/user/playlist'
import requestSongUrl from 'requests/song/url'

type PlayStatus = 'paused' | 'playing'
type PlayMode = 'random-mode' | 'infinit-mode' | 'recursive-mode'
type ComponentData = {
  currentSecond: number
  playMode: PlayMode
  playStatus: PlayStatus
}

// TODO - 要一个胶水层，使 MusicInfoInList 与 MusicInfoInUrl 合并

export default function PlayerBar() {
  const userInfo = getUserInfo()
  const globalState = useGlobalState()
  const response = useResponse(
    requestSongUrl,
    {
      id: globalState.songInfo.id,
    },
    // TODO - 如果有callback传参，指里的debug能容易很多
    [globalState.songInfo.id],
  )
  const playerBar = {
    /**音量大小 */
    volumn: 1,
    /**播放模式 */
    mode: '列表循环' as '单曲循环' | '列表循环' | '随机选取',
    /**播放列表 */
    musicList: [],
  }

  // TODO - useElement做hooks不好，因为这是一个含有副作用的操作，包在useEffect中更好
  const audioElement = useElement('audio', (el) => {
    el.volume = playerBar.volumn
  })

  const url = String(response.data?.[0].url)
  useEffect(() => {
    console.log('load url')
    audioElement.src = url
  }, [url])

  const currentSecondRef = useRef<HTMLSpanElement>()
  const [data, dataSetters] = useMethods(
    (componentData) => ({
      songSecond(
        setter: ((oldSeconds: number) => number) | number,
        options: { affectPlayerBar: boolean } = { affectPlayerBar: false },
      ) {
        const newSecond =
          typeof setter === 'function' ? setter(componentData.currentSecond) : setter
        if (newSecond <= Number(globalState.songInfo.dt) / 1000) {
          if (options.affectPlayerBar) audioElement.currentTime = newSecond
          componentData.currentSecond = newSecond
        }
      },
      playStatus(setter: ((oldStatus: PlayStatus) => PlayStatus) | PlayStatus) {
        const newStatus = typeof setter === 'function' ? setter(componentData.playStatus) : setter
        switch (newStatus) {
          case 'playing':
            audioElement.play()
            break
          case 'paused':
            audioElement.pause()
            break
        }
        componentData.playStatus = newStatus
      },
      playMode(setter: ((oldStatus: PlayMode) => PlayMode) | PlayMode) {
        const newMode = typeof setter === 'function' ? setter(componentData.playMode) : setter
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
        componentData.playMode = newMode
      },
    }),
    {
      currentSecond: 0,
      playStatus: 'paused',
      playMode: 'random-mode',
    } as ComponentData,
  )

  // 播放器进度条
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (data.playStatus === 'playing') {
        dataSetters.songSecond((n) => n + 1)
      }
    }, 1000)
    return () => clearTimeout(timeoutId)
  })
  return (
    <View as='section' className='player-bar'>
      <Image className='album-face' src={globalState.songInfo?.al?.picUrl} />
      <View className='music-buttons'>
        <Button className='last-song' onClick={() => console.log(`I'm clicked 1`)}>
          <Icon iconfontName='music_pre' />
        </Button>
        <Button
          className={data.playStatus}
          onClick={() => {
            dataSetters.playStatus((old) => (old === 'paused' ? 'playing' : 'paused'))
          }}
        >
          {data.playStatus === 'playing' ? (
            <Icon iconfontName='pause' />
          ) : (
            <Icon iconfontName='play' />
          )}
        </Button>
        <Button className='next-song' onClick={() => console.log(`I'm clicked 3`)}>
          <Icon iconfontName='music_next' />
        </Button>
      </View>
      <View className='timeSlider'>
        <View className='songTitle'>{globalState.songInfo.name}</View>
        <View className='timestamp'>
          <Text ref={currentSecondRef}>{duration(data.currentSecond * 1000).format('mm:ss')}</Text>
          <Text className='divider'> / </Text>
          <Text>{duration(globalState.songInfo.dt).format('mm:ss')}</Text>
        </View>
        <Slider
          value={data.currentSecond}
          max={Number(globalState.songInfo.dt) * 1000}
          onMoveTrigger={(incomeCurrentSecond) => {
            if (currentSecondRef.current) {
              currentSecondRef.current.textContent = duration(incomeCurrentSecond * 1000).format(
                'mm:ss',
              )
            }
          }}
          onMoveTriggerDone={(incomeCurrentSecond) => {
            dataSetters.songSecond(() => incomeCurrentSecond, { affectPlayerBar: true })
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
              onActive: () => dataSetters.playMode('random-mode'),
            },
            {
              node: <Icon iconfontName='infinit-mode' />,
              activeName: 'infinit-mode',
              onActive: () => dataSetters.playMode('infinit-mode'),
            },
            {
              node: <Icon iconfontName='recursive-mode' />,
              activeName: 'recursive-mode',
              onActive: () => dataSetters.playMode('recursive-mode'),
            },
          ]}
        />
        <Popover
          renderPopContent={
            <Slider
              defaultValue={playerBar.volumn}
              onMoveTriggerDone={(currentPercentage: number) => {
                // TODO appData.setVolumn(currentPercentage) // 这需要建立整个应用的dispatcher
                audioElement.volume = currentPercentage
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
