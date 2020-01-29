import myAvatar from 'assets/whiteEye--small.png' // 这个信息最终要靠后端传过来，现在只是占位
import avatar from 'assets/头像.jpg' // 这个信息最终要靠后端传过来，现在只是占位
import avatar2 from 'assets/whiteEye--small.png' // 这个信息最终要靠后端传过来，现在只是占位
import soundtrackUrl from 'assets/ezio Family.mp3' // 这个信息最终要靠后端传过来，现在只是占位
import soundtrackUrl2 from 'assets/Aimer - STAND-ALONE.mp3' // 这个信息最终要靠后端传过来，现在只是占位
import { asyncDo } from 'mypack/utils'
import { PoolMarket } from 'mypack/class'

/**
 * 装载触发App更新的dispacher, 由App提供
 */
let _storeDispatcher
function _updateRenderTree() {
  _storeDispatcher?.({ ...appStore })
}

/**
 * 提供给App的装载用函数
 */
export function loadDispatcher(storeDispatcher) {
  _storeDispatcher = storeDispatcher
}

/**
 * 回调函数的池及其控制用函数
 */
const _callbackPoolMarket = new PoolMarket()
function _invokeCallback(name: keyof DataDispatchers, ...params) {
  _callbackPoolMarket.getPool(name)?.forEach((callback) => callback(appStore, ...params))
}

/**
 * 整个Store
 */
export const appStore: AppStore = {
  userProfile: {
    avatar: myAvatar,
    nickname: 'edsolater',
    messageList: [],
  },
  menu: {
    initIndex: 0,
    collections: {
      null: [{ itemPathLabel: '搜索' }, { itemPathLabel: '发现音乐' }],
      我的音乐: [
        { itemPathLabel: '本地音乐', selectAction: 'show-local-music' },
        { itemPathLabel: '下载管理' },
        { itemPathLabel: '最近播放' },
      ],
      // '我的音乐-复制': [
      //   { title: '本地音乐', selectAction: 'show-local-music' },
      //   { title: '下载管理' },
      //   { title: '最近播放' },
      // ],
      // '我的音乐-复制2': [
      //   { title: '本地音乐', selectAction: 'show-local-music' },
      //   { title: '下载管理' },
      //   { title: '最近播放' },
      // ],
      // '我的音乐-复制3': [
      //   { title: '本地音乐', selectAction: 'show-local-music' },
      //   { title: '下载管理' },
      //   { title: '最近播放' },
      // ],
      // '我的音乐-复制4': [
      //   { title: '本地音乐', selectAction: 'show-local-music' },
      //   { title: '下载管理' },
      //   { title: '最近播放' },
      // ],
      创建的歌单: [{ itemPathLabel: '我喜欢的音乐' }, { itemPathLabel: '鬼畜' }],
      收藏的歌单: [{ itemPathLabel: '神级燃曲 · 百首顶级日漫激昂配乐' }],
    },
  },
  playerBar: {
    currentMusicInfo: {
      songName: 'words-Aimer',
      albumUrl: avatar,
      soundtrackUrl: soundtrackUrl,
    },
    volumn: 1,
    mode: '列表循环',
    musicList: [],
  },
  collectionInfo: {
    collectionTitle: '我喜欢的音乐',
    creatorInfo: {
      avatar: avatar2,
      nickName: 'edsolater',
    },
    thumbnail: avatar,
    createTime: '2016-09-13',
  },
  collectionMusicList: [
    {
      songName: `ezio Family.mp3`,
      albumUrl: avatar,
      soundtrackUrl: soundtrackUrl,
    },
    {
      songName: `Aimer - STAND-ALONE.mp3`,
      albumUrl: avatar2,
      soundtrackUrl: soundtrackUrl2,
    },
  ],
  playNewMusic(newMusic) {
    this.playerBar.currentMusicInfo = newMusic
    _updateRenderTree()
    console.log('_callbackPoolMarket.getAll(): ', _callbackPoolMarket.getAll())
    _invokeCallback('playNewMusic', newMusic)
    return this
  },
  loadNewMusicList() {
    return this
  },
  switchPlayMode() {
    return this
  },
  setVolumn(newVolumn) {
    //IDEA： 要一个 middleware 系统
    asyncDo(() => {
      this.playerBar.volumn = newVolumn
    })
      .then(() => {
        _updateRenderTree()
      })
      .then(() => {
        _invokeCallback('setVolumn', newVolumn)
      })
    return this
  },
  createNewMusicCollection() {
    return this
  },
  async getAllstore() {
    //TODO 这里逻辑没写全
    return JSON.parse(JSON.stringify(this))
  },
  on(dispatchName, callback) {
    _callbackPoolMarket.add(dispatchName, callback)
    return this
  },
  off(dispatchName, callback) {
    _callbackPoolMarket.remove(dispatchName, callback)
    return this
  },
}