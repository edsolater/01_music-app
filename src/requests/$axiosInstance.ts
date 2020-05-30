import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true // 需要带入证书信息
})
export default axiosInstance
