type RequestParams = {
  /**
   * 手机登录
   */
  '/login/cellphone': {
    params: {
      phone: number | string
      password: string
    }
    response: {
      loginType: 1
      code: 200
      account: UserAccount
      token: '7eb0de6e4d56dee68cda47d59a220801b37abf62c42f0e4ef7812704a0f09d5a1c6356423c4672268714e6f02f498a06719111a94fb470b4'
      profile: UserProfile
    }
  }
  /**
   * 获取用户歌单
   * 说明 : 登陆后调用此接口 , 传入用户 id, 可以获取用户歌单
   * @param params.uid  必选项用户 id
   */
  '/user/playlist': {
    params: {
      /**(必选项)用户 id */
      uid: ID
    }
    response: {
      more: boolean
      playlist: PlaylistItem[]
      code: 200
    }
  }
  /**
   * 喜欢音乐
   * 说明 : 调用此接口 , 传入音乐 id, 可喜欢该音乐
   */
  '/like': { params: { id?: ID; like?: boolean; timestamp?: TimeNumber }; response: {} }
  /**
   * 获取用户信息 , 歌单，收藏，mv, dj 数量
   * 说明 : 登陆后调用此接口 , 可以获取用户信息
   */
  '/likelist': {
    params: {
      /**(必选项)用户 id */
      uid?: ID
      timestamp?: TimeNumber
    }
    response: {
      ids: ID[]
      code: 200
    }
  }
  /**
   * 获取用户信息 , 歌单，收藏，mv, dj 数量
   * 说明 : 登陆后调用此接口 , 可以获取用户信息
   */
  '/banner': {
    params: {
      type?: ID /* type:资源类型,对应以下类型,默认为 0 即 PC
            0: pc
            1: android
            2: iphone
            3: ipad */
    }
    response: {
      banners: Banner[]
      code: 200
    }
  }
  /**
   * 获取每日推荐歌单
   * 说明 : 调用此接口 , 可获得每日推荐歌单 ( 需要登录 )
   */
  '/recommend/resource': {
    params: {}
    response: {
      recommend: RecommendResource[]
      code: 200
    }
  }
  /**
   * 独家放送(入口列表)
   */
  '/personalized/privatecontent': {
    params: {}
    response: {
      result: ExclusiveContent[]
      code: 200
    }
  }
  /**
   * 新歌速递
   */
  '/top/song': {
    params: {
      /**
       * type: 地区类型 id,对应以下:
       * 全部:0
       * 华语:7
       * 欧美:96
       * 日本:8
       * 韩国:16
       */
      type?: ID
    }
    response: {
      data: SongItem[]
      code: 200
    }
  }

  /**
   * 推荐mv
   */
  '/personalized/mv': {
    params: {}
    response: {
      result: MvBrief[]
      code: 200
    }
  }
  /**
   *  新晋电台榜/热门电台榜
   */
  '/dj/toplist': {
    params: { /** 类型：新/热门 */ type?: 'new' | 'hot' }
    response: {
      toplist: DJRank[]
      code: 200
      /**数据刷新时间 */
      updateTime: TimeNumber
    }
  }
  /**
   *  电台-今日优选
   */
  '/dj/today/perfered': {
    params: {}
    response: {
      data: DJItem[]
      code: 200
    }
  }
  /**
   * mv 列表（各种列表都是这个接口）
   */
  '/mv/all': {
    params: {
      /** 排序,不填则为上升最快 */
      order?: '上升最快' | '最热' | '最新'
      /** 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 */
      area?: '全部' | '内地' | '港台' | '欧美' | '日本' | '韩国'
      /** 取出数量 , 默认为 30 */
      limit?: number
      /** 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0 */
      offset?: number
    }
    response: {
      data: MvBrief2[]
      code: 200
      hasMore: boolean
      count: number
    }
  }
  /**
   * mv 列表（各种列表都是这个接口）
   */
  '/mv/exclusive/rcmd': {
    params: {
      /** 取出数量 , 默认为 30 */
      limit?: number
      /** 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0 */
      offset?: number
    }
    response: {
      data: MvBrief2[]
      code: 200
      more: boolean
    }
  }
  /**
   * 获取 mv 数据
   * 其中 mv 视频 网易做了防盗链处理 , 可能不能直接播放 , 需要播放的话需要调用 ' mv 地址' 接口
   */
  '/mv/detail': {
    params: {
      /** mv 的 id */
      mvid?: ID
    }
    response: {
      data: MvDetail
      code: 200
    }
  }
  /**
   * 获取 mv 的点赞数（自己是否已点赞）
   */
  '/mv/detail/info': {
    params: {
      /** mv 的 id */
      mvid?: ID
    }
    response: {
      /**总点赞数 */
      likedCount: number
      shareCount: number
      commentCount: number
      /**是否已点赞 */
      liked: boolean
      code: 200
    }
  }
  /**
   * 获取 mv 的地址
   */
  '/mv/url': {
    params: {
      /** mv 的 id */
      id?: ID
    }
    response: {
      data: {
        url: Url
      }
      code: 200
    }
  }
  /**
   * 获取相似mv
   */
  '/simi/mv': {
    params: {
      /** mv 的 id */
      mvid?: ID
    }
    response: {
      mvs: MvBrief2[]
      code: 200
    }
  }
  /**
   * 获取 mv 的评论
   */
  '/comment/mv': {
    params: {
      /** mv 的 id */
      id?: ID
      /**取出评论数量 , 默认为 20 */
      limit?: number
      /**偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值 */
      offset?: number
      /**分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到) */
      before?: number
    }
    response: {
      hotComments: CommentItem[]
      comments: CommentItem[]
      total: number
      more: boolean
      code: 200
    }
  }
  /**
   * 获取 歌曲 的评论
   */
  '/comment/music': {
    params: {
      /** 歌曲 的 id */
      id?: ID
      /**取出评论数量 , 默认为 20 */
      limit?: number
      /**偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值 */
      offset?: number
      /**分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到) */
      before?: number
    }
    response: {
      hotComments: CommentItem[]
      comments: CommentItem[]
      total: number
      more: boolean
      code: 200
    }
  }
  /**
   * 获取 歌词
   */
  '/lyric': {
    params: {
      /** 歌曲 的 id */
      id?: ID
    }
    response: {
      code: 200
    } & MusicLyric
  }
  /**
   * 相似歌曲
   */
  '/simi/song': {
    params: {
      /** 歌曲 的 id */
      id?: ID
    }
    response: {
      songs: SongItem[]
      code: 200
    }
  }
  /**
   * 包含这首歌的歌单
   */
  '/simi/playlist': {
    params: {
      /** 歌曲 的 id */
      id?: ID
    }
    response: {
      playlists: PlaylistItem[]
      code: 200
    }
  }
  /**
   * 获取用户歌单
   * 说明 : 登陆后调用此接口 , 传入用户 id, 可以获取用户歌单
   */
  '/playlist/detail': {
    params: {
      /** 歌单 id */
      id?: ID
      /** 歌单最近的 s 个收藏者 */
      s?: number
    }
    response: {
      playlist: PlaylistDetail
      privileges: MusicPrivileges[]
      code: 200
    }
  }
  /**
   * 获取音乐 url
   * 说明 : 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口 , 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url( 不需要登录 )
   */
  '/song/url': {
    params: {
      /** 音乐 id */
      id?: ID
      /**  码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推 */
      br?: number
    }
    response: {
      data: {
        url: SrcUrl
      }[]
      code: 200
    }
  }
}

export type AllResponse = {
  [K in keyof RequestParams]: RequestParams[K]['response']
}
