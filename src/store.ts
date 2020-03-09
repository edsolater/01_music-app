import { createStore, Store } from 'redux'

import myAvatar from 'assets/whiteEye--small.png' // 这个信息最终要靠后端传过来，现在只是占位
import avatar from 'assets/头像.jpg' // 这个信息最终要靠后端传过来，现在只是占位
import avatar2 from 'assets/whiteEye--small.png' // 这个信息最终要靠后端传过来，现在只是占位
import soundtrackUrl from 'assets/ezio Family.mp3' // 这个信息最终要靠后端传过来，现在只是占位
import soundtrackUrl2 from 'assets/Aimer - STAND-ALONE.mp3' // 这个信息最终要靠后端传过来，现在只是占位
import { RootState } from 'appDataType'
import { bigReducer } from 'reducer'
import { useSelector, TypedUseSelectorHook } from 'react-redux'

/**
 * 整个Store
 */
const initStore: RootState = {
  userProfile: {
    avatar: myAvatar,
    nickname: 'edsolater',
    messageList: [],
  },
  menu: {
    initIndex: 0,
    collections: {
      '': [
        { title: '搜索', icon: 'search' },
        { title: '发现音乐', icon: 'music-note' },
        { title: 'MV', icon: 'mv' },
        { title: '朋友', icon: 'friends' },
      ],
      '我的音乐': [
        { title: '本地音乐', detail: { selectAction: 'show-local-music' }, icon: 'local-music' },
        { title: '下载管理', icon: 'download' },
        { title: '最近播放', icon: 'history' },
        { title: '我的音乐云盘', icon: 'cloud-disk' },
        { title: '我的电台', icon: 'music-station' },
        { title: '我的收藏', icon: 'collection-folder' },
      ],
      '我的音乐-复制': [{ title: '本地音乐' }, { title: '下载管理' }, { title: '最近播放' }],
      // '我的音乐-复制2': [
      //   { title: '本地音乐' },
      //   { title: '下载管理' },
      //   { title: '最近播放' },
      // ],
      // '我的音乐-复制3': [
      //   { title: '本地音乐' },
      //   { title: '下载管理' },
      //   { title: '最近播放' },
      // ],
      // '我的音乐-复制4': [
      //   { title: '本地音乐' },
      //   { title: '下载管理' },
      //   { title: '最近播放' },
      // ],
      '创建的歌单': [
        { title: '我喜欢的音乐', icon: 'heart_empty', hasSomethingNew: true /* example */ },
        { title: '鬼畜' },
      ],
      '收藏的歌单': [{ title: '神级燃曲 · 百首顶级日漫激昂配乐急急急急急急啦啦啦啦啦啦啦啦啦啦' }],
    },
  },
  playerBar: {
    currentMusicInfo: {
      songName: 'words-Aimer',
      author: 'Aimer',
      albumName: 'STAND-ALONE',
      totalSeconds: 240,
      albumUrl: avatar,
      soundtrackUrl: soundtrackUrl,
    },
    volumn: 1,
    mode: '列表循环',
    musicList: [],
  },
  collectionInfo: {
    title: '我喜欢的音乐',
    creatorInfo: {
      avatar: avatar2,
      nickName: 'edsolater',
    },
    thumbnail: avatar,
    createTime: '2016-09-13',
  },
  collectionMusicList: [
    {
      isLiked: true,
      songName: `ezio Family.mp3`,
      songSubname: '(游戏《刺客信条》配乐)',
      author: 'Jesper Kyd',
      albumName: "Assassin's Creed 2 (Original Game Soundtrack)（刺客信条2 原声大碟）",
      totalSeconds: 144,
      albumUrl: avatar,
      soundtrackUrl: soundtrackUrl,
      isSQ: true,
    },
    {
      songName: `Aimer - STAND-ALONE.mp3`,
      author: 'Aimer',
      albumName: 'STAND-ALONE',
      totalSeconds: 240,
      albumUrl: avatar2,
      soundtrackUrl: soundtrackUrl2,
    },
    {
      songName: `Aimer - STAND-ALONE2.mp3`,
      author: 'Aimer',
      albumName: 'STAND-ALONE',
      totalSeconds: 240,
      albumUrl: avatar2,
      soundtrackUrl: soundtrackUrl2,
    },
    {
      songName: `Aimer - STAND-ALONE3.mp3`,
      author: 'Aimer',
      albumName: 'STAND-ALONE',
      totalSeconds: 240,
      albumUrl: avatar2,
      soundtrackUrl: soundtrackUrl2,
    },
    {
      songName: `Aimer - STAND-ALONE4.mp3`,
      author: 'Aimer',
      albumName: 'STAND-ALONE',
      totalSeconds: 240,
      albumUrl: avatar2,
      soundtrackUrl: soundtrackUrl2,
    },
  ],
}
export const store = createStore(bigReducer, initStore)
export const useTypedStoreSelector: TypedUseSelectorHook<RootState> = useSelector