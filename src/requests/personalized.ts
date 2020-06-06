import axiosInstance from './$axiosInstance'
/**
 * 推荐歌单
 * 说明 : 调用此接口 , 可获取推荐歌单
 * @param params.limit 取出数量 , 默认为 30 (不支持 offset)
 */
const requestPersonalized = (params?: { limit?: number }) =>
  axiosInstance.get<{
    hasTaste: boolean
    category: number
    code: HttpCode
    results: {
      id: ID
      type: number
      name: string
      copywriter: string
      picUrl: PicUrl
      canDislike: boolean
      playCount: number
      trackCount: number
      highQuality: boolean
      alg: 'featured'
    }[]
  }>('/personalized', { params })

export default requestPersonalized
