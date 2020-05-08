import axiosInstance from './$axiosInstance'
/**
 * 歌手榜热门歌手
 * 说明 : 调用此接口 , 可获取热门歌手数据
 * @param params.limit 取出数量 , 默认为 50
 * @param params.offset 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 */
const requestArtists = ({ offset = 0, limit = 50 } = {}) =>
  axiosInstance.get<{
    mode: boolean
    code: HttpCode
    artists: {
      img1v1Id: ID
      topicPerson: number
      followed: boolean //是否已关注此歌手
      picUrl: Url // 歌手照片
      img1v1Url: Url
      briefDesc: '' //主要专辑
      musicSize: number
      albumSize: number
      trans: string
      alias: []
      picId: ID //照片ID
      name: string
      id: ID
      accountId: ID
    }[]
  }>('/top/artists', {
    params: {
      offset,
      limit,
    },
  })

export default requestArtists
