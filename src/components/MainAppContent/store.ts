import avatar from 'assets/头像.jpg' // 这个信息最终要靠后端传过来，现在只是占位
import avatar2 from 'assets/whiteEye--small.png' // 这个信息最终要靠后端传过来，现在只是占位
import soundtrackUrl from 'assets/ezio Family.mp3' // 这个信息最终要靠后端传过来，现在只是占位
import soundtrackUrl2 from 'assets/Aimer - STAND-ALONE.mp3' // 这个信息最终要靠后端传过来，现在只是占位
import { MusicInfo } from 'global/interface'

type PicUrl = string

// 暴露给顶层store
const mainAppContentData = {
  collectionInfo: {
    label: '我喜欢的音乐',
    creatorInfo: {
      avatar: avatar2 as PicUrl,
      nickName: 'edsolater',
    },
    thumbnail: avatar as PicUrl,
    createTime: '2016-09-13',
  },
  collectionMusicList: <MusicInfo[]>[
    {
      isLiked: true,
      songName: `ezio Family.mp3`,
      songSubname: '(游戏《刺客信条》配乐)',
      author: 'Jesper Kyd',
      albumName: "Assassin's Creed 2 (Original Game Soundtrack)（刺客信条2 原声大碟）",
      totalSeconds: 144,
      albumUrl: avatar as PicUrl,
      soundtrackUrl: soundtrackUrl,
      isSQ: true,
    },
    {
      songName: `Aimer - STAND-ALONE.mp3`,
      author: 'Aimer',
      albumName: 'STAND-ALONE',
      totalSeconds: 240,
      albumUrl: avatar2 as PicUrl,
      soundtrackUrl: soundtrackUrl2,
    },
    {
      songName: `Aimer - STAND-ALONE2.mp3`,
      author: 'Aimer',
      albumName: 'STAND-ALONE',
      totalSeconds: 240,
      albumUrl: avatar2 as PicUrl,
      soundtrackUrl: soundtrackUrl2,
    },
    {
      songName: `Aimer - STAND-ALONE3.mp3`,
      author: 'Aimer',
      albumName: 'STAND-ALONE',
      totalSeconds: 240,
      albumUrl: avatar2 as PicUrl,
      soundtrackUrl: soundtrackUrl2,
    },
    {
      songName: `Aimer - STAND-ALONE4.mp3`,
      author: 'Aimer',
      albumName: 'STAND-ALONE',
      totalSeconds: 240,
      albumUrl: avatar2 as PicUrl,
      soundtrackUrl: soundtrackUrl2,
    },
  ],
}
export default mainAppContentData
