import myAvatar from 'assets/whiteEye--small.png' // 这个信息最终要靠后端传过来，现在只是占位
import avatar from 'assets/头像.jpg' // 这个信息最终要靠后端传过来，现在只是占位
import avatar2 from 'assets/whiteEye--small.png' // 这个信息最终要靠后端传过来，现在只是占位
import soundtrackUrl from 'assets/ezio Family.mp3' // 这个信息最终要靠后端传过来，现在只是占位
import soundtrackUrl2 from 'assets/Aimer - STAND-ALONE.mp3' // 这个信息最终要靠后端传过来，现在只是占位

export const initAppData: DataSchema = {
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
      songTitle: 'words-Aimer',
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
      songTitle: `ezio Family.mp3`,
      albumUrl: avatar,
      soundtrackUrl: soundtrackUrl,
    },
    {
      songTitle: `Aimer - STAND-ALONE.mp3`,
      albumUrl: avatar2,
      soundtrackUrl: soundtrackUrl2,
    },
  ],
  playNewMusic() {
    return this
  },
  loadNewMusicList() {
    return this
  },
  switchPlayMode() {
    return this
  },
  setVolumn() {
    return this
  },
  createNewMusicCollection() {
    return this
  },
}
