import { CollectionItemInfo } from 'global/interface'

// 暴露给顶层store
const albumMenuData = {
  initIndex: 0,
  collections: <{ [groupName: string]: CollectionItemInfo[] }>{
    '': [
      { label: '搜索dddd', icon: 'search' },
      { label: '发现音乐', icon: 'music-note' },
      { label: 'MV', icon: 'mv' },
      { label: '朋友', icon: 'friends' },
    ],
    '我的音乐': [
      { label: '本地音乐', detail: { selectAction: 'show-local-disk-music' }, icon: 'local-music' },
      { label: '下载管理', icon: 'download' },
      { label: '最近播放', icon: 'history' },
      { label: '我的音乐云盘', icon: 'cloud-disk' },
      { label: '我的电台', icon: 'music-station' },
      { label: '我的收藏', icon: 'collection-folder' },
    ],
    '我的音乐-复制': [{ label: '本地音乐' }, { label: '下载管理' }, { label: '最近播放' }],
    '创建的歌单': [
      { label: '我喜欢的音乐', icon: 'heart_empty', hasSomethingNew: true /* example */ },
      { label: '鬼畜' },
    ],
    '收藏的歌单': [{ label: '神级燃曲 · 百首顶级日漫激昂配乐急急急急急急啦啦啦啦啦啦啦啦啦啦' }],
  },
}
export default albumMenuData
