import axiosInstance from './$axiosInstance'
/**
 * 手机登录
 * 说明 : 调用此接口 , 可获取推荐歌单
 * @param options.phone 取出数量 , 默认为 30 (不支持 offset)
 */
const requestLogin = ({ phone = '' as number | string, password = '' } = {}) =>
  axiosInstance.get<{
    loginType: 1
    code: 200
    account: {
      id: 332094633
      userName: '1_18116311669'
      type: 1
      status: 0
      whitelistAuthority: 0
      createTime: 1477486940747
      salt: '[B@71aa5eb0'
      tokenVersion: 1
      ban: 0
      baoyueVersion: 0
      donateVersion: 0
      vipType: 0
      viptypeVersion: 0
      anonimousUser: false
    }
    token: '7eb0de6e4d56dee68cda47d59a220801b37abf62c42f0e4ef7812704a0f09d5a1c6356423c4672268714e6f02f498a06719111a94fb470b4'
    profile: {
      description: ''
      vipType: 0
      gender: 1
      accountStatus: 0
      avatarImgId: 18930291695769540
      nickname: 'desolaters'
      birthday: 859651200000
      city: 310101
      djStatus: 0
      userType: 0
      backgroundImgId: 2002210674180203
      avatarUrl: 'https://p4.music.126.net/dojDWGioRe3yRnecOy-Yog==/18930291695769539.jpg'
      defaultAvatar: false
      province: 310000
      avatarImgIdStr: '18930291695769539'
      backgroundImgIdStr: '2002210674180203'
      experts: {}
      expertTags: null
      authStatus: 0
      mutual: false
      remarkName: null
      userId: 332094633
      detailDescription: ''
      backgroundUrl: 'https://p1.music.126.net/bmA_ablsXpq3Tk9HlEg9sA==/2002210674180203.jpg'
      followed: false
      signature: '-。-'
      authority: 0
      avatarImgId_str: '18930291695769539'
      followeds: 1
      follows: 3
      eventCount: 0
      playlistCount: 23
      playlistBeSubscribedCount: 1
    }
    bindings: [
      {
        expired: false
        expiresIn: 2147483647
        tokenJsonStr: '{"countrycode":"","cellphone":"18116311669","hasPassword":true}'
        url: ''
        userId: 332094633
        refreshTime: 1486535213
        bindingTime: 1486535213816
        id: 2974594781
        type: 1
      },
      {
        expired: true
        expiresIn: 604799
        tokenJsonStr: '{"access_token":"7fcdc8cecd8d6fdd7f695a6c68a84f97","douban_user_id":"89541076","refresh_token":"3feef4e4c423ca6cbfccdeae4c6b5f44","douban_user_name":"desolater","expires_in":604799}'
        url: 'http://www.douban.com/people/89541076'
        userId: 332094633
        refreshTime: 1489479931
        bindingTime: 1489479931328
        id: 2990705529
        type: 3
      },
      {
        expired: true
        expiresIn: 7776000
        tokenJsonStr: '{"access_token":"5F15BF89BEC62FE17D29A9F4DB67FF8F","refresh_token":"572A906FDBD2C34461FF71164A72747E","openid":"2536465B55907AD98796D8C8C3CD6E66","nickname":"涎鱼","expires_in":7776000}'
        url: ''
        userId: 332094633
        refreshTime: 1530157899
        bindingTime: 1486535233334
        id: 2974615192
        type: 5
      },
      {
        expired: true
        expiresIn: 7200
        tokenJsonStr: '{"access_token":"28_sOuRg8RcGx6vcmVUpvdaVfC3hEid-fl5cGrnUYR6iR-Ah7Mff-kSBjLJO-pimlr6GoNM4gxSyHd7BNY9f-w55xdHEB099eWzlvIDQ_X8xbo","expires_in":7200,"refresh_token":"28_K4FwMBsIuSnN1k2UHEkQ_h01iIINWO47LEqxGFiZeXZgtkxkb0Jf_8sAdzfLUqgT4nNm8nQzGq2EFruEa8jjLvWG9KThAKvDBIX0m_quD40","openid":"o5xcyt0rVe0JFuNF5jDewsJNiepI","scope":"snsapi_login","unionid":"oZoefuJrK34xoD56s8nY-wRBSQ-0","nickname":"涎鱼"}'
        url: ''
        userId: 332094633
        refreshTime: 1575806504
        bindingTime: 1486535258147
        id: 2974593818
        type: 10
      },
      {
        expired: false
        expiresIn: 2147483647
        tokenJsonStr: '{"uid":"653146d5ce9a6c1446d33c5d2cacddfb"}'
        url: ''
        userId: 332094633
        refreshTime: 1489479910
        bindingTime: 1489479910607
        id: 2990697772
        type: 11
      },
    ]
  }>('/login/cellphone', { params: { phone, password } })

export default requestLogin
