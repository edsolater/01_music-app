import axiosInstance from '../$axiosInstance'
export type IPlaylistItem = {
  subscribers: []
  subscribed: false
  creator: {
    defaultAvatar: false
    province: 310000
    authStatus: 0
    followed: false
    avatarUrl: 'http://p1.music.126.net/dojDWGioRe3yRnecOy-Yog==/18930291695769539.jpg'
    accountStatus: 0
    gender: 1
    city: 310101
    birthday: 859651200000
    userId: 332094633
    userType: 0
    nickname: 'desolaters'
    signature: '-。-'
    description: ''
    detailDescription: ''
    avatarImgId: 18930291695769540
    backgroundImgId: 2002210674180203
    backgroundUrl: 'http://p1.music.126.net/bmA_ablsXpq3Tk9HlEg9sA==/2002210674180203.jpg'
    authority: 0
    mutual: false
    expertTags: null
    experts: null
    djStatus: 0
    vipType: 0
    remarkName: null
    avatarImgIdStr: '18930291695769539'
    backgroundImgIdStr: '2002210674180203'
    avatarImgId_str: '18930291695769539'
  }
  artists: null
  tracks: null
  updateFrequency: null
  backgroundCoverId: 0
  backgroundCoverUrl: null
  titleImage: 0
  titleImageUrl: null
  englishTitle: null
  opRecommend: false
  recommendInfo: null
  description: null
  cloudTrackCount: 6
  subscribedCount: 0
  adType: 0
  trackNumberUpdateTime: 1588423626730
  status: 0
  ordered: true
  tags: []
  trackCount: 802
  privacy: 0
  trackUpdateTime: 1588423626841
  totalDuration: 0
  updateTime: 1588423626730
  commentThreadId: 'A_PL_0_463877326'
  coverImgUrl: 'https://p1.music.126.net/izHPmED6rIWcw5D0DgN07A==/19111711114380350.jpg'
  userId: 332094633
  createTime: 1473777704104
  highQuality: false
  coverImgId: 19111711114380350
  newImported: false
  anonimous: false
  specialType: 5
  playCount: 6706
  name: 'desolaters喜欢的音乐'
  id: 463877326
  coverImgId_str: '19111711114380350'
}
/**
 * 获取用户歌单
 * 说明 : 登陆后调用此接口 , 传入用户 id, 可以获取用户歌单
 * @param options.uid  必选项用户 id
 */
const requestUserPlaylist = ({ uid = '' as string | number } = {}) =>
  axiosInstance.get<{
    more: true
    playlist: IPlaylistItem[]
    code: HttpCode
  }>('/user/playlist', { params: { uid } })

export default requestUserPlaylist
