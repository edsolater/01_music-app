import axiosInstance from '../$axiosInstance'
import { meaningful } from 'utils/judger'

type Response = {
  data: ResponseSongUrl
  code: number
}

export type ResponseSongUrl = {
  id: 39224533
  url: 'http://m7.music.126.net/20200508164504/c6e9fab7b29308e96c6704cff8cf1647/ymusic/82b7/664a/69c1/86954fdc2bd9b0789925f50b84e4ac79.mp3'
  br: 320000
  size: 10904598
  md5: '86954fdc2bd9b0789925f50b84e4ac79'
  code: 200
  expi: 1200
  type: 'mp3'
  gain: 0
  fee: 0
  uf: null
  payed: 0
  flag: 0
  canExtend: false
  freeTrialInfo: null
  level: 'exhigh'
  encodeType: 'mp3'
}[]

/**
 * 获取用户歌单
 * 说明 : 登陆后调用此接口 , 传入用户 id, 可以获取用户歌单
 * @param params.id  必选项 音乐 id
 * @param params.br  码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 */
const requestSongUrl = (params: { id: ID | undefined; br?: number }) => {
  if (meaningful(params.id)) {
    return axiosInstance.get<Response>('/song/url', { params })
  } else {
    return undefined
  }
}

export default requestSongUrl
