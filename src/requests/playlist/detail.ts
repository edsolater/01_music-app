/**
 * FIXME - 顶好是如果判断条件不满足，就不要请求d
 */
import { axiosInstance } from '../$axiosInstance'
import { isMeaningful } from 'utils/judger'

export type ResponsePlaylistDetail = {
  code?: 200
  relatedVideos?: null
  playlist?: {
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
    tracks: {
      name: 'ロストワンの号哭'
      id: 26124988
      pst: 0
      t: 0
      ar: [
        {
          id: 546614
          name: 'Neru'
          tns: []
          alias: []
        },
        {
          id: 160154
          name: '鏡音リン'
          tns: []
          alias: []
        }
      ]
      alia: []
      pop: 100
      st: 0
      rt: ''
      fee: 0
      v: 8
      crbt: null
      cf: ''
      al: {
        id: 2393432
        name: '世界征服'
        picUrl: 'http://p2.music.126.net/O1zMQTo7Xttfv8QflHFyXw==/2289183209054989.jpg'
        tns: []
        pic: 2289183209054989
      }
      dt: 217000
      h: {
        br: 320000
        fid: 0
        size: 8713627
        vd: -49500
      }
      m: {
        br: 192000
        fid: 0
        size: 5228265
        vd: -47100
      }
      l: {
        br: 128000
        fid: 0
        size: 3485584
        vd: -46100
      }
      a: null
      cd: '1'
      no: 2
      rtUrl: null
      ftype: 0
      rtUrls: []
      djId: 0
      copyright: 2
      s_id: 0
      mark: 9007199255003136
      originCoverType: 0
      noCopyrightRcmd: null
      mst: 9
      cp: 663018
      mv: 0
      rtype: 0
      rurl: null
      publishTime: 1362499200007
    }[]
    trackIds: {
      id: 26124988
      v: 8
      alg: null
    }[]
    updateFrequency: null
    backgroundCoverId: 0
    backgroundCoverUrl: null
    titleImage: 0
    titleImageUrl: null
    englishTitle: null
    opRecommend: false
    description: null
    createTime: 1473777704104
    highQuality: false
    userId: 332094633
    coverImgUrl: 'http://p1.music.126.net/a6wsM-HO3kSc3Wde_YcWhw==/3421680186876278.jpg'
    newImported: false
    coverImgId: 3421680186876278
    updateTime: 1588432917801
    specialType: 5
    trackCount: 803
    commentThreadId: 'A_PL_0_463877326'
    privacy: 0
    trackUpdateTime: 1588762500250
    playCount: 6731
    trackNumberUpdateTime: 1588432917801
    subscribedCount: 0
    cloudTrackCount: 6
    ordered: true
    adType: 0
    status: 0
    tags: []
    name: 'desolaters喜欢的音乐'
    id: 463877326
    shareCount: 0
    commentCount: 0
  }
  urls?: null
  privileges?: {
    id: 26124988
    fee: 0
    payed: 0
    st: 0
    pl: 320000
    dl: 999000
    sp: 7
    cp: 1
    subp: 1
    cs: false
    maxbr: 999000
    fl: 320000
    toast: false
    flag: 128
    preSell: false
    playMaxbr: 999000
    downloadMaxbr: 999000
  }[]
}

/**
 * 获取用户歌单
 * 说明 : 登陆后调用此接口 , 传入用户 id, 可以获取用户歌单
 * @param params.id  歌单 id
 * @param params.s  歌单最近的 s 个收藏者
 */
export const requestPlaylistDetail = (params: { id: ID | undefined; s?: number }) => {
  if (isMeaningful(params.id)) {
    return axiosInstance.get<ResponsePlaylistDetail>(`/playlist/detail`, { params })
  } else {
    return undefined
  }
}
