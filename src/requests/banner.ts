import axiosInstance from './$axiosInstance'
/**
 * banner
 * 说明 : 调用此接口 , 可获取 banner( 轮播图 ) 数据
 * @param options.type 资源类型,对应以下类型,默认为 0 即PC
 */
const requestBanner = ({ type = 0 } = {}) =>
  axiosInstance.get<{
    mode: boolean
    code: HttpCode
    banners: {
      imageUrl: Url //banner图片
      url: Url //内藏海报
    }[]
  }>('/banner', { params: { type } })
export default requestBanner
